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
};

export type BandDjsDataType = {
  __typename?: 'BandDjsDataType';
  sample?: Maybe<Scalars['String']>;
};

export type BandDjsDetailsInput = {
  sample?: Maybe<Scalars['String']>;
};

export type BeautyProfessionalDataType = {
  __typename?: 'BeautyProfessionalDataType';
  sample?: Maybe<Scalars['String']>;
};

export type BeautyProfessionalDetailsInput = {
  sample?: Maybe<Scalars['String']>;
};

export type CakesDessertsDataType = {
  __typename?: 'CakesDessertsDataType';
  sample?: Maybe<Scalars['String']>;
};

export type CakesDessertsDetailsInput = {
  sample?: Maybe<Scalars['String']>;
};

export type CatererDataType = {
  __typename?: 'CatererDataType';
  sample?: Maybe<Scalars['String']>;
};

export type CatererDetailsInput = {
  sample?: Maybe<Scalars['String']>;
};

export type City = {
  __typename?: 'City';
  name: Scalars['String'];
  key: Scalars['String'];
};

export type Clap = {
  __typename?: 'Clap';
  name: Scalars['String'];
  key: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type ClapInput = {
  name: Scalars['String'];
  key: Scalars['String'];
  values: Array<Scalars['String']>;
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
  district_display_name?: Maybe<Scalars['String']>;
};

export type District = {
  __typename?: 'District';
  name: Scalars['String'];
  key: Scalars['String'];
  cities: Array<City>;
};

export type FloristsDataType = {
  __typename?: 'FloristsDataType';
  sample?: Maybe<Scalars['String']>;
};

export type FloristsDetailsInput = {
  sample?: Maybe<Scalars['String']>;
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
  vendorRegisterOtp: Scalars['Boolean'];
  vendorRegister: Scalars['Boolean'];
  vendorLoginOtp?: Maybe<Scalars['Boolean']>;
  vendorLogin?: Maybe<Scalars['Boolean']>;
  vendorLogout: Scalars['Boolean'];
  confirmEmailVendor?: Maybe<Scalars['Boolean']>;
  forgotPassword: Scalars['Boolean'];
  changePassword?: Maybe<VendorProfile>;
  vendorEditDetails: Scalars['Boolean'];
};


export type MutationVendorRegisterOtpArgs = {
  phone: Scalars['String'];
};


export type MutationVendorRegisterArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  password: Scalars['String'];
  otp: Scalars['String'];
};


export type MutationVendorLoginOtpArgs = {
  phone: Scalars['String'];
};


export type MutationVendorLoginArgs = {
  otp: Scalars['Float'];
  phone: Scalars['String'];
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


export type MutationVendorEditDetailsArgs = {
  data: VendorDetailsInput;
};

export type NodeEdge = {
  __typename?: 'NodeEdge';
  node: ConnectionNode;
  /** Used in `before` and `after` args */
  cursor: Scalars['String'];
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
  sample?: Maybe<Scalars['String']>;
};

export type PhotographerDetailsInput = {
  sample?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  isVendorPhoneExist: Scalars['Boolean'];
  vendorProfile?: Maybe<VendorProfile>;
  vendorSearch: Connection;
  vendorSearchWithExtra: ConnectionExtra;
  vendorDetails?: Maybe<VendorDetails>;
  vendorDetailsB?: Maybe<VendorDetails>;
  vendorDetailsExtra?: Maybe<VendorDetailsExtra>;
  provinces: Array<LocationNode>;
  districts: Array<LocationNode>;
  cities: Array<LocationNode>;
  clapStore: Array<StoreClap>;
};


export type QueryIsVendorPhoneExistArgs = {
  phone: Scalars['String'];
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


export type QueryClapStoreArgs = {
  vendorType: VendorType;
};

export type SocialMedia = {
  __typename?: 'SocialMedia';
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  pinterest?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type StoreClap = {
  __typename?: 'StoreClap';
  name: Scalars['String'];
  key: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type VendorDetails = {
  __typename?: 'VendorDetails';
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  searchLocations?: Maybe<Array<District>>;
  vendor_type?: Maybe<VendorType>;
  links?: Maybe<SocialMedia>;
  business_name?: Maybe<Scalars['String']>;
  frequent_questions?: Maybe<Array<FrequentQuestion>>;
  vendorTypes?: Maybe<VendorTypes>;
  galleryPhoto?: Maybe<Array<Image>>;
  geo?: Maybe<Geo>;
  description?: Maybe<Scalars['String']>;
  claps?: Maybe<Array<Clap>>;
};

export type VendorDetailsExtra = {
  __typename?: 'VendorDetailsExtra';
  phone?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  searchLocations?: Maybe<Array<District>>;
  vendor_type?: Maybe<VendorType>;
  links?: Maybe<SocialMedia>;
  business_name?: Maybe<Scalars['String']>;
  frequent_questions?: Maybe<Array<FrequentQuestion>>;
  vendorTypes?: Maybe<VendorTypes>;
  galleryPhoto?: Maybe<Array<Image>>;
  geo?: Maybe<Geo>;
  description?: Maybe<Scalars['String']>;
  claps?: Maybe<Array<Clap>>;
  isComplete?: Maybe<Scalars['Boolean']>;
};

/** Edit common vendor details */
export type VendorDetailsInput = {
  address?: Maybe<Scalars['String']>;
  cityIDs?: Maybe<Array<Scalars['String']>>;
  phone?: Maybe<Scalars['String']>;
  frequentQuestion?: Maybe<Array<FrequentQuestionInput>>;
  vendorType?: Maybe<VendorType>;
  businessName?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  pinterest?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  geo?: Maybe<GeoInput>;
  gallery_photos?: Maybe<Array<GalleryPhotoInput>>;
  venueDetails?: Maybe<VenueDetailsInput>;
  photographerDetails?: Maybe<PhotographerDetailsInput>;
  catererDetails?: Maybe<CatererDetailsInput>;
  bandDjsDetails?: Maybe<BandDjsDetailsInput>;
  beautyProfessionalDetails?: Maybe<BeautyProfessionalDetailsInput>;
  cakesDessertsDetails?: Maybe<CakesDessertsDetailsInput>;
  floristsDetails?: Maybe<FloristsDetailsInput>;
  videographerDetails?: Maybe<VideographerDetailsInput>;
  claps?: Maybe<Array<ClapInput>>;
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
  email?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  verified: Scalars['Boolean'];
};

export enum VendorType {
  Venue = 'venue',
  Photographer = 'photographer',
  Caterer = 'caterer',
  Videographer = 'videographer',
  Florist = 'florist',
  BandsDj = 'bands_dj',
  BeautyProfessional = 'beauty_professional',
  CakesDessert = 'cakes_dessert'
}

export type VendorTypes = {
  __typename?: 'VendorTypes';
  caterer_type?: Maybe<CatererDataType>;
  venue_type?: Maybe<VenueDataType>;
  photographer_type?: Maybe<PhotographerDataType>;
  band_djs_type?: Maybe<BandDjsDataType>;
  beauty_professionals_type?: Maybe<BeautyProfessionalDataType>;
  cakes_desserts_type?: Maybe<CakesDessertsDataType>;
  florists_type?: Maybe<FloristsDataType>;
  videographer_type?: Maybe<VideographerDataType>;
};

export type VenueDataType = {
  __typename?: 'VenueDataType';
  sample?: Maybe<Scalars['String']>;
};

export type VenueDetailsInput = {
  sample?: Maybe<Scalars['String']>;
};

export type VideographerDataType = {
  __typename?: 'VideographerDataType';
  sample?: Maybe<Scalars['String']>;
};

export type VideographerDetailsInput = {
  sample?: Maybe<Scalars['String']>;
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

export type VendorDetailsBQueryVariables = Exact<{
  businessName: Scalars['String'];
  vid?: Maybe<Scalars['String']>;
}>;


export type VendorDetailsBQuery = (
  { __typename?: 'Query' }
  & { vendorDetailsB?: Maybe<(
    { __typename?: 'VendorDetails' }
    & Pick<VendorDetails, 'phone' | 'business_name' | 'vendor_type' | 'description' | 'address'>
    & { galleryPhoto?: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'id' | 'ht' | 'wd'>
    )>>, frequent_questions?: Maybe<Array<(
      { __typename?: 'FrequentQuestion' }
      & Pick<FrequentQuestion, 'answer' | 'question'>
    )>>, searchLocations?: Maybe<Array<(
      { __typename?: 'District' }
      & Pick<District, 'name'>
      & { cities: Array<(
        { __typename?: 'City' }
        & Pick<City, 'name'>
      )> }
    )>>, links?: Maybe<(
      { __typename?: 'SocialMedia' }
      & Pick<SocialMedia, 'facebook' | 'instagram' | 'pinterest' | 'website'>
    )>, claps?: Maybe<Array<(
      { __typename?: 'Clap' }
      & Pick<Clap, 'name' | 'key' | 'values'>
    )>> }
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
    searchLocations {
      cities {
        name
      }
      name
    }
    links {
      facebook
      instagram
      pinterest
      website
    }
    description
    address
    claps {
      name
      key
      values
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