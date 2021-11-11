import {ValidateNested} from 'class-validator';
import {
    Args,
    ArgsType,
    Field,
    InputType,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import {VendorType} from '../common/const';
import {VendorDataDoc} from '../models/VendorData';
import {
    ConnectionArgs,
    connectionTypes,
    toGlobalId,
} from './utils/connectionPaging';
import {search, searchResultCount} from '../db_operations/search';
import parseSearchQuery from './utils/parseSearchQuery';
import {getDistrictNames, getDistrictsByCities} from '../models/Location';
import {Image} from './object_types/Image';

@InputType({description: 'Register new vendor data'})
class ListInput {
    @Field(() => String, {nullable: true})
    // todo: these Comments
    // @Validate(IsObjectID)
    // @Validate(IsDistrictID)
    districtID?: string;

    @Field(() => VendorType, {nullable: true})
    vendorType?: VendorType;

    @Field(() => String, {nullable: true})
    searchQuery?: string;
}

//todo: refactor class name both connection and list args
@ArgsType()
class ListArgs extends ConnectionArgs {
    @Field(() => ListInput, { nullable: true })
    @ValidateNested()
    where?: ListInput;

    async validate(vDataCount: number) {
        const { limit, offset } = this.pagingParams();
        if (limit > 30) throw new Error("should be below 30");

        if (vDataCount + 30 < limit + offset) throw new Error("drawer limit");
    }
}

// Return type
@ObjectType()
export class ConnectionNode {
    @Field(() => String)
    business_name: string;

    @Field(() => String, {nullable: true})
    business_name_slug?: string;

    @Field(() => String)
    id: string;

    @Field(() => [Image])
    gallery_photos: Image[];

    @Field(() => VendorType)
    vendor_type: VendorType;

    @Field(() => String, {nullable: true})
    district_display_name?: string;
}

@ObjectType()
class Connection extends connectionTypes<ConnectionNode>("Node", ConnectionNode) {
    constructor() {
        super();
        this.pageInfo = {
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: null,
            endCursor: null,
        };

        this.edges = [];
    }

    //todo: now
    static async getConnectionFromCursor(
        cursor: VendorDataDoc[],
        limit: number,
        offset: number,
        vDataCount: number
    ): Promise<Connection> {
        let conn: Connection = new Connection();
        for (const vData of cursor) {

            conn.edges.push({
                cursor: toGlobalId({
                    type: "conn",
                    id: String(offset + conn.edges.length + 1),
                }),
                node: {
                    id: vData.id,
                    business_name: vData.business_name,
                    business_name_slug: vData.business_name_slug,
                    gallery_photos: vData.gallery_photos,
                    vendor_type: vData.vendor_type,
                    district_display_name: (await getDistrictsByCities([ vData.search_city_ids[0] ]))[0].display_name
                },
            });
        }

        if (offset > 0) conn.pageInfo.hasPreviousPage = true;
        if (vDataCount - offset - limit > 0) conn.pageInfo.hasNextPage = true;
        if (conn.edges.length > 0)
            conn.pageInfo.startCursor = conn.edges[0].cursor;
        if (conn.edges.length > 1)
            conn.pageInfo.endCursor = conn.edges[conn.edges.length - 1].cursor;

        return conn;
    }
}

@ObjectType()
class ConnectionExtra extends Connection {
    @Field(() => VendorType, { nullable: true })
    vendor_type?: VendorType;

    @Field(() => String, { nullable: true })
    district_key?: string;

    @Field(() => String, { nullable: true })
    district_id?: string;
}

// Resolver
@Resolver()
export class VendorSearchResolver {
    @Query(() => Connection)
    async vendorSearch(@Args() data: ListArgs, conExtra?: ConnectionExtra): Promise<Connection> {
        const { limit, offset } = data.pagingParams();

        const parsedSearchQuery = !data?.where?.districtID && !data?.where?.vendorType && data?.where?.searchQuery
            ? await parseSearchQuery(data?.where?.searchQuery) : null;

        if (parsedSearchQuery && conExtra) {
            conExtra.vendor_type = parsedSearchQuery?.vendorType ?? undefined;
            conExtra.district_key = parsedSearchQuery?.districtKey ?? undefined;
            conExtra.district_id = parsedSearchQuery?.districtID ?? undefined;
        }

        if (data?.where?.searchQuery && parsedSearchQuery) {
            data.where = {
                ...data.where,
                ...parsedSearchQuery,
            };
        }
        const lTotal = await searchResultCount({
            districtID: data?.where?.districtID,
            vendorType: data?.where?.vendorType,
        });
        await data.validate(lTotal);

        const cursor = lTotal ? await search(
            {
                districtID: data?.where?.districtID,
                vendorType: data?.where?.vendorType,
            },
            { limit, offset },
        ) : [];

        return await Connection.getConnectionFromCursor(cursor, limit, offset, lTotal);
    }

    @Query(() => ConnectionExtra)
    async vendorSearchWithExtra(@Args() data: ListArgs): Promise<ConnectionExtra> {
        let conExtra: ConnectionExtra = new ConnectionExtra();
        const conn = await this.vendorSearch(data, conExtra);
        conExtra = {
            ...conExtra,
            ...conn,
        };
        return conExtra;
    }
}
