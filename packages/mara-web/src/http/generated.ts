import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { useSWRInfinite, SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface, SWRInfiniteConfiguration as SWRInfiniteConfigInterface } from 'swr';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CatererDataType = {
  __typename?: 'CatererDataType';
  services?: Maybe<Array<Scalars['String']>>;
  types_of_meal_service?: Maybe<Array<Scalars['String']>>;
};

export type CatererDetailsInput = {
  services?: Maybe<Array<Scalars['String']>>;
  types_of_meal_services?: Maybe<Array<Scalars['String']>>;
};

export type Connection = {
  __typename?: 'Connection';
  pageInfo: PageInfo;
  edges: Array<NodeEdge>;
};

export type ConnectionExtra = {
  __typename?: 'ConnectionExtra';
  pageInfo: PageInfo;
  edges: Array<NodeEdge>;
  vendor_type?: Maybe<VendorType>;
  district_key?: Maybe<Scalars['String']>;
  district_id?: Maybe<Scalars['String']>;
};

export type ConnectionNode = {
  __typename?: 'ConnectionNode';
  business_name: Scalars['String'];
  id: Scalars['String'];
  gallery_photos: Array<Image>;
  vendor_type: VendorType;
  district_display_name: Scalars['String'];
};


export type FrequentQuestion = {
  __typename?: 'FrequentQuestion';
  question: Scalars['String'];
  answer: Scalars['String'];
};

/** Edit common vendor details */
export type FrequentQuestionInput = {
  question: Scalars['String'];
  answer: Scalars['String'];
};

export type GalleryPhotoInput = {
  token?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type Geo = {
  __typename?: 'Geo';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type GeoInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Image = {
  __typename?: 'Image';
  ht: Scalars['Float'];
  wd: Scalars['Float'];
  id: Scalars['String'];
};

/** Register new vendor data */
export type ListInput = {
  districtID?: Maybe<Scalars['String']>;
  vendorType?: Maybe<VendorType>;
  searchQuery?: Maybe<Scalars['String']>;
};

export type LocationNode = {
  __typename?: 'LocationNode';
  id: Scalars['String'];
  name: Scalars['String'];
  key: Scalars['String'];
  parent_id?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  vendorLogin?: Maybe<Scalars['Boolean']>;
  vendorLogout: Scalars['Boolean'];
  confirmEmailVendor?: Maybe<Scalars['Boolean']>;
  forgotPassword: Scalars['Boolean'];
  changePassword?: Maybe<VendorProfile>;
  createNewOtpId: Scalars['String'];
  sendOtp: Scalars['Boolean'];
  register: VendorProfile;
  vendorEditDetails: Scalars['Boolean'];
};


export type MutationVendorLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationConfirmEmailVendorArgs = {
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: VendorPasswordChangeInput;
};


export type MutationCreateNewOtpIdArgs = {
  pin: Scalars['String'];
};


export type MutationSendOtpArgs = {
  data: SendOtpInput;
};


export type MutationRegisterArgs = {
  data: VendorRegisterInput;
};


export type MutationVendorEditDetailsArgs = {
  data: VendorDetailsInput;
};

export type NodeEdge = {
  __typename?: 'NodeEdge';
  node: ConnectionNode;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type PhotographerDataType = {
  __typename?: 'PhotographerDataType';
  services?: Maybe<Array<Scalars['String']>>;
  deliverables?: Maybe<Array<Scalars['String']>>;
};

export type PhotographerDetailsInput = {
  services?: Maybe<Array<Scalars['String']>>;
  deliverables?: Maybe<Array<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  vendorProfile?: Maybe<VendorProfile>;
  vendorSearch: Connection;
  vendorSearchWithExtra: ConnectionExtra;
  vendorDetails?: Maybe<VendorDetails>;
  vendorDetailsB?: Maybe<VendorDetails>;
  vendorDetailsExtra: VendorDetails;
  provinces: Array<LocationNode>;
  districts: Array<LocationNode>;
  cities: Array<LocationNode>;
};


export type QueryVendorSearchArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  where?: Maybe<ListInput>;
};


export type QueryVendorSearchWithExtraArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  where?: Maybe<ListInput>;
};


export type QueryVendorDetailsArgs = {
  vendorDataId: Scalars['String'];
};


export type QueryVendorDetailsBArgs = {
  businessName: Scalars['String'];
  vendorDataId?: Maybe<Scalars['String']>;
};


export type QueryDistrictsArgs = {
  province_id?: Maybe<Scalars['String']>;
};


export type QueryCitiesArgs = {
  districts_id?: Maybe<Scalars['String']>;
};

/** otp input */
export type SendOtpInput = {
  id: Scalars['String'];
  phone: Scalars['String'];
};

export type SocialMedia = {
  __typename?: 'SocialMedia';
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  pinterest?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newVendorRegistered: Notification;
};

export type VendorDetails = {
  __typename?: 'VendorDetails';
  phone: Scalars['String'];
  address: Scalars['String'];
  search_districts: Array<Scalars['String']>;
  vendor_type: VendorType;
  links: SocialMedia;
  business_name: Scalars['String'];
  frequent_questions: Array<FrequentQuestion>;
  vendorTypes: VendorTypes;
  galleryPhoto: Array<Image>;
  geo?: Maybe<Geo>;
  photographerData?: Maybe<PhotographerDataType>;
  catererData?: Maybe<CatererDataType>;
  venueData?: Maybe<VenueDataType>;
  description?: Maybe<Scalars['String']>;
};

/** Edit common vendor details */
export type VendorDetailsInput = {
  address?: Maybe<Scalars['String']>;
  searchDistrictIDs?: Maybe<Array<Scalars['String']>>;
  phone?: Maybe<Scalars['String']>;
  frequentQuestion?: Maybe<Array<FrequentQuestionInput>>;
  vendorType?: Maybe<VendorType>;
  businessName?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  pinterest?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  geo?: Maybe<GeoInput>;
  gallery_photos?: Maybe<Array<GalleryPhotoInput>>;
  venueDetails?: Maybe<VenueDetailsInput>;
  photographerDetails?: Maybe<PhotographerDetailsInput>;
  catererDetails?: Maybe<CatererDetailsInput>;
};

/** vendor password change input */
export type VendorPasswordChangeInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type VendorProfile = {
  __typename?: 'VendorProfile';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  verified: Scalars['Boolean'];
};

/** Register new vendor data */
export type VendorRegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  password: Scalars['String'];
  registerID: Scalars['String'];
  otp: Scalars['String'];
};

/** All vendor types */
export enum VendorType {
  Venue = 'venue',
  Photographer = 'photographer',
  Caterer = 'caterer'
}

export type VendorTypes = {
  __typename?: 'VendorTypes';
  caterer_type?: Maybe<CatererDataType>;
  venue_type?: Maybe<VenueDataType>;
  photographer_type?: Maybe<PhotographerDataType>;
};

export type VenueDataType = {
  __typename?: 'VenueDataType';
  venue_types?: Maybe<Array<Scalars['String']>>;
  venue_settings?: Maybe<Array<Scalars['String']>>;
};

export type VenueDetailsInput = {
  venue_type?: Maybe<Array<Scalars['String']>>;
  venue_setting?: Maybe<Array<Scalars['String']>>;
};

export type TopWeddingVendorsQueryVariables = Exact<{ [key: string]: never; }>;


export type TopWeddingVendorsQuery = (
  { __typename?: 'Query' }
  & { vendorSearch: (
    { __typename?: 'Connection' }
    & { edges: Array<(
      { __typename?: 'NodeEdge' }
      & { node: (
        { __typename?: 'ConnectionNode' }
        & Pick<ConnectionNode, 'business_name' | 'id' | 'vendor_type' | 'district_display_name'>
        & { gallery_photos: Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'ht' | 'wd'>
        )> }
      ) }
    )> }
  ) }
);

export type LocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationsQuery = (
  { __typename?: 'Query' }
  & { districts: Array<(
    { __typename?: 'LocationNode' }
    & Pick<LocationNode, 'id' | 'name' | 'key'>
  )> }
);

export type ExampleQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
}>;


export type ExampleQuery = (
  { __typename?: 'Query' }
  & { vendorSearchWithExtra: (
    { __typename?: 'ConnectionExtra' }
    & Pick<ConnectionExtra, 'district_key'>
  ) }
);

export type VendorDetailsBQueryVariables = Exact<{
  businessName: Scalars['String'];
  vid?: Maybe<Scalars['String']>;
}>;


export type VendorDetailsBQuery = (
  { __typename?: 'Query' }
  & { vendorDetailsB?: Maybe<(
    { __typename?: 'VendorDetails' }
    & Pick<VendorDetails, 'phone' | 'business_name' | 'vendor_type' | 'search_districts' | 'description' | 'address'>
    & { galleryPhoto: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'ht' | 'wd'>
    )>, frequent_questions: Array<(
      { __typename?: 'FrequentQuestion' }
      & Pick<FrequentQuestion, 'answer' | 'question'>
    )>, links: (
      { __typename?: 'SocialMedia' }
      & Pick<SocialMedia, 'facebook' | 'instagram' | 'pinterest' | 'website'>
    ), catererData?: Maybe<(
      { __typename?: 'CatererDataType' }
      & Pick<CatererDataType, 'services' | 'types_of_meal_service'>
    )>, venueData?: Maybe<(
      { __typename?: 'VenueDataType' }
      & Pick<VenueDataType, 'venue_settings' | 'venue_types'>
    )>, photographerData?: Maybe<(
      { __typename?: 'PhotographerDataType' }
      & Pick<PhotographerDataType, 'deliverables' | 'services'>
    )> }
  )> }
);

export type VendorSearchQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  searchQuery?: Maybe<Scalars['String']>;
  districtID?: Maybe<Scalars['String']>;
  vendorType?: Maybe<VendorType>;
}>;


export type VendorSearchQuery = (
  { __typename?: 'Query' }
  & { vendorSearchWithExtra: (
    { __typename?: 'ConnectionExtra' }
    & Pick<ConnectionExtra, 'district_key' | 'vendor_type' | 'district_id'>
    & { edges: Array<(
      { __typename?: 'NodeEdge' }
      & Pick<NodeEdge, 'cursor'>
      & { node: (
        { __typename?: 'ConnectionNode' }
        & Pick<ConnectionNode, 'business_name' | 'id' | 'vendor_type' | 'district_display_name'>
        & { gallery_photos: Array<(
          { __typename?: 'Image' }
          & Pick<Image, 'id' | 'ht' | 'wd'>
        )> }
      ) }
    )>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'endCursor'>
    ) }
  ) }
);


export const TopWeddingVendorsDocument = gql`
    query TopWeddingVendors {
  vendorSearch(first: 10) {
    edges {
      node {
        business_name
        id
        gallery_photos {
          id
          ht
          wd
        }
        vendor_type
        district_display_name
      }
    }
  }
}
    `;
export const LocationsDocument = gql`
    query Locations {
  districts {
    id
    name
    key
  }
}
    `;
export const ExampleDocument = gql`
    query Example($after: String) {
  vendorSearchWithExtra(after: $after) {
    district_key
  }
}
    `;
export const VendorDetailsBDocument = gql`
    query VendorDetailsB($businessName: String!, $vid: String) {
  vendorDetailsB(businessName: $businessName, vendorDataId: $vid) {
    phone
    galleryPhoto {
      id
      ht
      wd
    }
    business_name
    frequent_questions {
      answer
      question
    }
    vendor_type
    search_districts
    links {
      facebook
      instagram
      pinterest
      website
    }
    description
    address
    catererData {
      services
      types_of_meal_service
    }
    venueData {
      venue_settings
      venue_types
    }
    photographerData {
      deliverables
      services
    }
  }
}
    `;
export const VendorSearchDocument = gql`
    query VendorSearch($after: String, $searchQuery: String, $districtID: String, $vendorType: VendorType) {
  vendorSearchWithExtra(
    first: 12
    after: $after
    where: {districtID: $districtID, searchQuery: $searchQuery, vendorType: $vendorType}
  ) {
    district_key
    vendor_type
    district_id
    edges {
      cursor
      node {
        business_name
        id
        gallery_photos {
          id
          ht
          wd
        }
        vendor_type
        district_display_name
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TopWeddingVendors(variables?: TopWeddingVendorsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TopWeddingVendorsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TopWeddingVendorsQuery>(TopWeddingVendorsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TopWeddingVendors');
    },
    Locations(variables?: LocationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LocationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LocationsQuery>(LocationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Locations');
    },
    Example(variables?: ExampleQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ExampleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ExampleQuery>(ExampleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Example');
    },
    VendorDetailsB(variables: VendorDetailsBQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VendorDetailsBQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<VendorDetailsBQuery>(VendorDetailsBDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'VendorDetailsB');
    },
    VendorSearch(variables?: VendorSearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<VendorSearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<VendorSearchQuery>(VendorSearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'VendorSearch');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type SWRInfiniteKeyLoader<Data = unknown, Variables = unknown> = (
  index: number,
  previousPageData: Data | null
) => [keyof Variables, Variables[keyof Variables] | null] | null;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  const utilsForInfinite = {
    generateGetKey: <Data = unknown, Variables = unknown>(
      id: any,
      getKey: SWRInfiniteKeyLoader<Data, Variables>
    ) => (pageIndex: number, previousData: Data | null) => {
      const key = getKey(pageIndex, previousData)
      return key ? [...key, ...id] : null
    },
    generateFetcher: <Query = unknown, Variables = unknown>(query: (variables: Variables) => Promise<Query>, variables?: Variables) => (
        fieldName: keyof Variables,
        fieldValue: Variables[typeof fieldName]
      ) => query({ ...variables, [fieldName]: fieldValue } as Variables)
  }
  const genKey = <V extends Record<string, unknown> = Record<string, unknown>>(name: string, object: V = {} as V): SWRKeyInterface => [name, ...Object.keys(object).sort().map(key => object[key])];
  return {
    ...sdk,
    useTopWeddingVendors(variables?: TopWeddingVendorsQueryVariables, config?: SWRConfigInterface<TopWeddingVendorsQuery, ClientError>) {
      return useSWR<TopWeddingVendorsQuery, ClientError>(genKey<TopWeddingVendorsQueryVariables>('TopWeddingVendors', variables), () => sdk.TopWeddingVendors(variables), config);
    },
    useLocations(variables?: LocationsQueryVariables, config?: SWRConfigInterface<LocationsQuery, ClientError>) {
      return useSWR<LocationsQuery, ClientError>(genKey<LocationsQueryVariables>('Locations', variables), () => sdk.Locations(variables), config);
    },
    useExample(variables?: ExampleQueryVariables, config?: SWRConfigInterface<ExampleQuery, ClientError>) {
      return useSWR<ExampleQuery, ClientError>(genKey<ExampleQueryVariables>('Example', variables), () => sdk.Example(variables), config);
    },
    useVendorDetailsB(variables: VendorDetailsBQueryVariables, config?: SWRConfigInterface<VendorDetailsBQuery, ClientError>) {
      return useSWR<VendorDetailsBQuery, ClientError>(genKey<VendorDetailsBQueryVariables>('VendorDetailsB', variables), () => sdk.VendorDetailsB(variables), config);
    },
    useVendorSearch(variables?: VendorSearchQueryVariables, config?: SWRConfigInterface<VendorSearchQuery, ClientError>) {
      return useSWR<VendorSearchQuery, ClientError>(genKey<VendorSearchQueryVariables>('VendorSearch', variables), () => sdk.VendorSearch(variables), config);
    },
    useVendorSearchInfinite(getKey: SWRInfiniteKeyLoader<VendorSearchQuery, VendorSearchQueryVariables>, variables?: VendorSearchQueryVariables, config?: SWRInfiniteConfigInterface<VendorSearchQuery, ClientError>) {
      return useSWRInfinite<VendorSearchQuery, ClientError>(
        utilsForInfinite.generateGetKey<VendorSearchQuery, VendorSearchQueryVariables>(genKey<VendorSearchQueryVariables>('VendorSearch', variables), getKey),
        utilsForInfinite.generateFetcher<VendorSearchQuery, VendorSearchQueryVariables>(sdk.VendorSearch, variables),
        config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;