import { ArgsType, ClassType, Field, InputType, ObjectType } from 'type-graphql'
import { base64, unBase64 } from '../../utils/base64';


/**
 * A type alias for cursors in this implementation.
 */
export type ConnectionCursor = string;

/**
 * A type designed to be exposed as `PageInfo` over GraphQL.
 */
export type IPageInfo = {
  startCursor?: ConnectionCursor | null,
  endCursor?: ConnectionCursor | null,
  hasPreviousPage: boolean,
  hasNextPage: boolean,
};

/**
 * A type describing the arguments a connection field receives in GraphQL.
 */
export type IConnectionArguments = {
  before?: ConnectionCursor | null,
  after?: ConnectionCursor | null,
  first?: number | null,
  last?: number | null,
};

/**
 * A type designed to be exposed as a `Connection` over GraphQL.
 */
export type IConnection<T> = {
  edges: Array<IEdge<T>>,
  pageInfo: PageInfo,
};

/**
 * A type designed to be exposed as a `Edge` over GraphQL.
 */
export type IEdge<T> = {
  node: T,
  cursor: ConnectionCursor,
};

@ObjectType()
export class PageInfo implements IPageInfo {
  @Field()
  hasNextPage!: boolean

  @Field()
  hasPreviousPage!: boolean

  @Field({nullable: true})
  startCursor: ConnectionCursor

  @Field({nullable: true})
  endCursor: ConnectionCursor
}

@ArgsType()
export class ConnectionArgs implements IConnectionArguments {
  @Field({ nullable: true, description: 'Paginate before opaque cursor' })
  before?: ConnectionCursor
  @Field({ nullable: true, description: 'Paginate after opaque cursor' })
  after?: ConnectionCursor
  @Field({ nullable: true, description: 'Paginate first' })
  first?: number
  @Field({ nullable: true, description: 'Paginate last' })
  last?: number

  pagingParams() {
    return getPagingParameters(this)
  }
}

export function connectionTypes<T>(name: string, nodeType: ClassType<T>) {
  @ObjectType(`${name}Edge`)
  class Edge implements IEdge<T> {
    @Field(() => nodeType)
    node!: T

    @Field({ description: 'Used in `before` and `after` args' })
    cursor!: ConnectionCursor
  }

  @ObjectType(`${name}Connection`)
  class Connection implements IConnection<T> {
    @Field()
    pageInfo!: PageInfo

    @Field(() => [Edge])
    edges!: Edge[]
  }
  return Connection
}

type ResolvedGlobalId = {
  type: 'conn',
  id: string,
};

/**
 * Takes a type name and an ID specific to that type name, and returns a
 * "global ID" that is unique among all types.
 */
export function toGlobalId(thing: ResolvedGlobalId): string {
  return base64([thing.type, thing.id].join(':'));
}

/**
 * Takes the "global ID" created by toGlobalID, and returns the type name and ID
 * used to create it.
 */
export function fromGlobalId(globalId: string): ResolvedGlobalId {
  const unBasedGlobalId = unBase64(globalId);
  const delimiterPos = unBasedGlobalId.indexOf(':');
  const type = unBasedGlobalId.substring(0, delimiterPos);
  if (type !== 'conn') throw new Error("type of the id is unknown");
  return {
    type: type,
    id: unBasedGlobalId.substring(delimiterPos + 1),
  };
}

// =================================================
type PagingMeta =
  | { pagingType: 'forward'; after?: string; first: number }
  | { pagingType: 'backward'; before?: string; last: number }
  | { pagingType: 'none' }

function checkPagingSanity(args: ConnectionArgs): PagingMeta {
  const { first = 0, last = 0, after, before } = args
  const isForwardPaging = !!first || !!after
  const isBackwardPaging = !!last || !!before

  if (isForwardPaging && isBackwardPaging) {
    throw new Error('cursor-based pagination cannot be forwards AND backwards')
  }
  if ((isForwardPaging && before) || (isBackwardPaging && after)) {
    throw new Error('paging must use either first/after or last/before')
  }
  if ((isForwardPaging && first < 0) || (isBackwardPaging && last < 0)) {
    throw new Error('paging limit must be positive')
  }
  // This is a weird corner case. We'd have to invert the ordering of query to get the last few items then re-invert it when emitting the results.
  // We'll just ignore it for now.
  if (last && !before) {
    throw new Error("when paging backwards, a 'before' argument is required")
  }
  return isForwardPaging
    ? { pagingType: 'forward', after, first }
    : isBackwardPaging
      ? { pagingType: 'backward', before, last }
      : { pagingType: 'none' }
}

const getId = (cursor: ConnectionCursor) => parseInt(fromGlobalId(cursor).id, 10)
// const nextId = (cursor: ConnectionCursor) => getId(cursor) + 1

/**
 * Create a `paging parameters` object with 'limit' and 'offset' fields based on the incoming
 * cursor-paging arguments.
 *
 * TODO: Handle the case when a user uses 'last' alone.
 */
export function getPagingParameters(args: ConnectionArgs) {
  const meta = checkPagingSanity(args)

  switch (meta.pagingType) {
    case 'forward': {
      if (meta.after && !getId(meta.after)) throw new Error("not a valid after value")
      return {
        limit: meta.first,
        offset: meta.after ? getId(meta.after) : 0,
      }
    }
    case 'backward': {
      const { last, before } = meta
      let limit = last
      let offset = getId(before!) - last

      // Check to see if our before-page is underflowing past the 0th item
      if (offset < 0) {
        // Adjust the limit with the underflow value
        limit = Math.max(last + offset, 0)
        offset = 0
      }

      return { offset, limit }
    }
    default:
      return {}
  }
}
