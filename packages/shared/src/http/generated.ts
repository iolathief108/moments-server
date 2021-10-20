import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { GraphQLError } from 'graphql-request/dist/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
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
  pricing?: Maybe<Spp>;
  personInfo?: Maybe<PersonInfo>;
};

export type BandDjsDetailsInput = {
  pricing?: Maybe<SppInput>;
  personInfo?: Maybe<PersonInfoInput>;
};

export type BeautyProfessionalDataType = {
  __typename?: 'BeautyProfessionalDataType';
  pricing?: Maybe<Spp>;
  personInfo?: Maybe<PersonInfo>;
};

export type BeautyProfessionalDetailsInput = {
  pricing?: Maybe<SppInput>;
  personInfo?: Maybe<PersonInfoInput>;
};

export type CakesDessertsDataType = {
  __typename?: 'CakesDessertsDataType';
  pricing?: Maybe<Spp>;
  personInfo?: Maybe<PersonInfo>;
};

export type CakesDessertsDetailsInput = {
  pricing?: Maybe<SppInput>;
  personInfo?: Maybe<PersonInfoInput>;
};

export type CatererDataType = {
  __typename?: 'CatererDataType';
  pricing?: Maybe<Spp>;
  personInfo?: Maybe<PersonInfo>;
};

export type CatererDetailsInput = {
  pricing?: Maybe<SppInput>;
  personInfo?: Maybe<PersonInfoInput>;
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

export type FixedInput = {
  price?: Maybe<Scalars['Float']>;
};

export type FixedObject = {
  __typename?: 'FixedObject';
  price?: Maybe<Scalars['Float']>;
};

export type FloristsDataType = {
  __typename?: 'FloristsDataType';
  pricing?: Maybe<Spp>;
  personInfo?: Maybe<PersonInfo>;
};

export type FloristsDetailsInput = {
  pricing?: Maybe<SppInput>;
  personInfo?: Maybe<PersonInfoInput>;
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

export enum ListingStatus {
  Verified = 'verified',
  Unverified = 'unverified',
  Suspended = 'suspended',
  Pending = 'pending',
  PaymentPending = 'paymentPending'
}

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
  authCode: Scalars['String'];
};


export type MutationVendorLoginOtpArgs = {
  phone: Scalars['String'];
};


export type MutationVendorLoginArgs = {
  password: Scalars['String'];
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

export type PackageInput = {
  name?: Maybe<Scalars['String']>;
  short?: Maybe<Scalars['String']>;
  min_price?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Array<PriceInput>>;
};

export type PackageObject = {
  __typename?: 'PackageObject';
  name?: Maybe<Scalars['String']>;
  short?: Maybe<Scalars['String']>;
  min_price?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Array<PriceObject>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type PersonInfo = {
  __typename?: 'PersonInfo';
  person_photo: Image;
  name: Scalars['String'];
  position?: Maybe<Scalars['String']>;
};

export type PersonInfoInput = {
  personPhoto: PersonPhotoInput;
  name: Scalars['String'];
  position?: Maybe<Scalars['String']>;
};

export type PersonPhotoInput = {
  token: Scalars['String'];
};

export type PhotographerDataType = {
  __typename?: 'PhotographerDataType';
  pricing?: Maybe<Spp>;
  personInfo?: Maybe<PersonInfo>;
};

export type PhotographerDetailsInput = {
  pricing?: Maybe<SppInput>;
  personInfo?: Maybe<PersonInfoInput>;
};

export type PriceInput = {
  name?: Maybe<Scalars['String']>;
  price_type: PriceType;
  fixed?: Maybe<FixedInput>;
  range?: Maybe<RangeInput>;
  starting?: Maybe<StartingInput>;
  unit?: Maybe<Scalars['String']>;
};

export type PriceObject = {
  __typename?: 'PriceObject';
  name?: Maybe<Scalars['String']>;
  price_type: PriceType;
  fixed?: Maybe<FixedObject>;
  range?: Maybe<RangeObject>;
  starting?: Maybe<StartingObject>;
  unit?: Maybe<Scalars['String']>;
};

export enum PriceType {
  Fixed = 'fixed',
  Range = 'range',
  Starting = 'starting'
}

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

export type RangeInput = {
  from_price?: Maybe<Scalars['Float']>;
  to_price?: Maybe<Scalars['Float']>;
};

export type RangeObject = {
  __typename?: 'RangeObject';
  from_price?: Maybe<Scalars['Float']>;
  to_price?: Maybe<Scalars['Float']>;
};

export type SocialMedia = {
  __typename?: 'SocialMedia';
  facebook?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  pinterest?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type Spp = {
  __typename?: 'Spp';
  min_price?: Maybe<Scalars['Float']>;
  packages?: Maybe<Array<PackageObject>>;
};

export type SppInput = {
  min_price?: Maybe<Scalars['Float']>;
  packages?: Maybe<Array<PackageInput>>;
};

export type StartingInput = {
  price?: Maybe<Scalars['Float']>;
};

export type StartingObject = {
  __typename?: 'StartingObject';
  price?: Maybe<Scalars['Float']>;
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
  listingStatus?: Maybe<ListingStatus>;
  isLive?: Maybe<Scalars['Boolean']>;
  reason?: Maybe<Scalars['String']>;
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
  pricing?: Maybe<Spp>;
};

export type VenueDetailsInput = {
  pricing?: Maybe<SppInput>;
};

export type VideographerDataType = {
  __typename?: 'VideographerDataType';
  pricing?: Maybe<Spp>;
  personInfo?: Maybe<PersonInfo>;
};

export type VideographerDetailsInput = {
  pricing?: Maybe<SppInput>;
  personInfo?: Maybe<PersonInfoInput>;
};

export type VendorLoginOtpMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type VendorLoginOtpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vendorLoginOtp'>
);

export type VendorLoginMutationVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type VendorLoginMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vendorLogin'>
);

export type GetVendorProfileIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorProfileIdQuery = (
  { __typename?: 'Query' }
  & { vendorProfile?: Maybe<(
    { __typename?: 'VendorProfile' }
    & Pick<VendorProfile, 'id'>
  )> }
);

export type GetVendorProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorProfileQuery = (
  { __typename?: 'Query' }
  & { vendorProfile?: Maybe<(
    { __typename?: 'VendorProfile' }
    & Pick<VendorProfile, 'id' | 'firstName' | 'lastName' | 'email' | 'phone' | 'verified'>
  )> }
);

export type VendorLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type VendorLogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vendorLogout'>
);

export type IsVendorPhoneExistQueryVariables = Exact<{
  phone: Scalars['String'];
}>;


export type IsVendorPhoneExistQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isVendorPhoneExist'>
);

export type VendorRegisterOtpMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type VendorRegisterOtpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vendorRegisterOtp'>
);

export type VendorRegisterMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  password: Scalars['String'];
  authCode: Scalars['String'];
}>;


export type VendorRegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vendorRegister'>
);

export type EditVendorDetailsMutationVariables = Exact<{
  businessName?: Maybe<Scalars['String']>;
  vendorType?: Maybe<VendorType>;
  address?: Maybe<Scalars['String']>;
  galleryPhotos?: Maybe<Array<GalleryPhotoInput> | GalleryPhotoInput>;
  frequentQuestion?: Maybe<Array<FrequentQuestionInput> | FrequentQuestionInput>;
  geo?: Maybe<GeoInput>;
  phone?: Maybe<Scalars['String']>;
  cityIds?: Maybe<Array<Scalars['String']> | Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  pinterest?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  claps?: Maybe<Array<ClapInput> | ClapInput>;
  description?: Maybe<Scalars['String']>;
  catererDetails?: Maybe<CatererDetailsInput>;
  photographerDetails?: Maybe<PhotographerDetailsInput>;
  venueDetails?: Maybe<VenueDetailsInput>;
  videographerDetails?: Maybe<VideographerDetailsInput>;
  bandDjsDetails?: Maybe<BandDjsDetailsInput>;
  beautyProfessionalsDetails?: Maybe<BeautyProfessionalDetailsInput>;
  cakesDessertsDetails?: Maybe<CakesDessertsDetailsInput>;
  floristsDetails?: Maybe<FloristsDetailsInput>;
}>;


export type EditVendorDetailsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vendorEditDetails'>
);

export type GetVendorDetailsExtraQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVendorDetailsExtraQuery = (
  { __typename?: 'Query' }
  & { vendorDetailsExtra?: Maybe<(
    { __typename?: 'VendorDetailsExtra' }
    & Pick<VendorDetailsExtra, 'phone' | 'description' | 'address' | 'listingStatus' | 'reason' | 'isLive' | 'vendor_type' | 'business_name' | 'isComplete'>
    & { vendorTypes?: Maybe<(
      { __typename?: 'VendorTypes' }
      & { caterer_type?: Maybe<(
        { __typename?: 'CatererDataType' }
        & { pricing?: Maybe<(
          { __typename?: 'Spp' }
          & Pick<Spp, 'min_price'>
          & { packages?: Maybe<Array<(
            { __typename?: 'PackageObject' }
            & Pick<PackageObject, 'name' | 'short' | 'min_price' | 'description'>
            & { price?: Maybe<Array<(
              { __typename?: 'PriceObject' }
              & Pick<PriceObject, 'name' | 'price_type' | 'unit'>
              & { fixed?: Maybe<(
                { __typename?: 'FixedObject' }
                & Pick<FixedObject, 'price'>
              )>, range?: Maybe<(
                { __typename?: 'RangeObject' }
                & Pick<RangeObject, 'from_price' | 'to_price'>
              )>, starting?: Maybe<(
                { __typename?: 'StartingObject' }
                & Pick<StartingObject, 'price'>
              )> }
            )>> }
          )>> }
        )>, personInfo?: Maybe<(
          { __typename?: 'PersonInfo' }
          & Pick<PersonInfo, 'name' | 'position'>
          & { person_photo: (
            { __typename?: 'Image' }
            & Pick<Image, 'ht' | 'wd' | 'id'>
          ) }
        )> }
      )>, beauty_professionals_type?: Maybe<(
        { __typename?: 'BeautyProfessionalDataType' }
        & { pricing?: Maybe<(
          { __typename?: 'Spp' }
          & Pick<Spp, 'min_price'>
          & { packages?: Maybe<Array<(
            { __typename?: 'PackageObject' }
            & Pick<PackageObject, 'name' | 'short' | 'min_price' | 'description'>
            & { price?: Maybe<Array<(
              { __typename?: 'PriceObject' }
              & Pick<PriceObject, 'name' | 'price_type' | 'unit'>
              & { fixed?: Maybe<(
                { __typename?: 'FixedObject' }
                & Pick<FixedObject, 'price'>
              )>, range?: Maybe<(
                { __typename?: 'RangeObject' }
                & Pick<RangeObject, 'from_price' | 'to_price'>
              )>, starting?: Maybe<(
                { __typename?: 'StartingObject' }
                & Pick<StartingObject, 'price'>
              )> }
            )>> }
          )>> }
        )>, personInfo?: Maybe<(
          { __typename?: 'PersonInfo' }
          & Pick<PersonInfo, 'name' | 'position'>
          & { person_photo: (
            { __typename?: 'Image' }
            & Pick<Image, 'ht' | 'wd' | 'id'>
          ) }
        )> }
      )>, venue_type?: Maybe<(
        { __typename?: 'VenueDataType' }
        & { pricing?: Maybe<(
          { __typename?: 'Spp' }
          & Pick<Spp, 'min_price'>
          & { packages?: Maybe<Array<(
            { __typename?: 'PackageObject' }
            & Pick<PackageObject, 'name' | 'short' | 'min_price' | 'description'>
            & { price?: Maybe<Array<(
              { __typename?: 'PriceObject' }
              & Pick<PriceObject, 'name' | 'price_type' | 'unit'>
              & { fixed?: Maybe<(
                { __typename?: 'FixedObject' }
                & Pick<FixedObject, 'price'>
              )>, range?: Maybe<(
                { __typename?: 'RangeObject' }
                & Pick<RangeObject, 'from_price' | 'to_price'>
              )>, starting?: Maybe<(
                { __typename?: 'StartingObject' }
                & Pick<StartingObject, 'price'>
              )> }
            )>> }
          )>> }
        )> }
      )>, photographer_type?: Maybe<(
        { __typename?: 'PhotographerDataType' }
        & { pricing?: Maybe<(
          { __typename?: 'Spp' }
          & Pick<Spp, 'min_price'>
          & { packages?: Maybe<Array<(
            { __typename?: 'PackageObject' }
            & Pick<PackageObject, 'name' | 'short' | 'min_price' | 'description'>
            & { price?: Maybe<Array<(
              { __typename?: 'PriceObject' }
              & Pick<PriceObject, 'name' | 'price_type' | 'unit'>
              & { fixed?: Maybe<(
                { __typename?: 'FixedObject' }
                & Pick<FixedObject, 'price'>
              )>, range?: Maybe<(
                { __typename?: 'RangeObject' }
                & Pick<RangeObject, 'from_price' | 'to_price'>
              )>, starting?: Maybe<(
                { __typename?: 'StartingObject' }
                & Pick<StartingObject, 'price'>
              )> }
            )>> }
          )>> }
        )>, personInfo?: Maybe<(
          { __typename?: 'PersonInfo' }
          & Pick<PersonInfo, 'name' | 'position'>
          & { person_photo: (
            { __typename?: 'Image' }
            & Pick<Image, 'ht' | 'wd' | 'id'>
          ) }
        )> }
      )>, videographer_type?: Maybe<(
        { __typename?: 'VideographerDataType' }
        & { pricing?: Maybe<(
          { __typename?: 'Spp' }
          & Pick<Spp, 'min_price'>
          & { packages?: Maybe<Array<(
            { __typename?: 'PackageObject' }
            & Pick<PackageObject, 'name' | 'short' | 'min_price' | 'description'>
            & { price?: Maybe<Array<(
              { __typename?: 'PriceObject' }
              & Pick<PriceObject, 'name' | 'price_type' | 'unit'>
              & { fixed?: Maybe<(
                { __typename?: 'FixedObject' }
                & Pick<FixedObject, 'price'>
              )>, range?: Maybe<(
                { __typename?: 'RangeObject' }
                & Pick<RangeObject, 'from_price' | 'to_price'>
              )>, starting?: Maybe<(
                { __typename?: 'StartingObject' }
                & Pick<StartingObject, 'price'>
              )> }
            )>> }
          )>> }
        )>, personInfo?: Maybe<(
          { __typename?: 'PersonInfo' }
          & Pick<PersonInfo, 'name' | 'position'>
          & { person_photo: (
            { __typename?: 'Image' }
            & Pick<Image, 'ht' | 'wd' | 'id'>
          ) }
        )> }
      )>, band_djs_type?: Maybe<(
        { __typename?: 'BandDjsDataType' }
        & { pricing?: Maybe<(
          { __typename?: 'Spp' }
          & Pick<Spp, 'min_price'>
          & { packages?: Maybe<Array<(
            { __typename?: 'PackageObject' }
            & Pick<PackageObject, 'name' | 'short' | 'min_price' | 'description'>
            & { price?: Maybe<Array<(
              { __typename?: 'PriceObject' }
              & Pick<PriceObject, 'name' | 'price_type' | 'unit'>
              & { fixed?: Maybe<(
                { __typename?: 'FixedObject' }
                & Pick<FixedObject, 'price'>
              )>, range?: Maybe<(
                { __typename?: 'RangeObject' }
                & Pick<RangeObject, 'from_price' | 'to_price'>
              )>, starting?: Maybe<(
                { __typename?: 'StartingObject' }
                & Pick<StartingObject, 'price'>
              )> }
            )>> }
          )>> }
        )>, personInfo?: Maybe<(
          { __typename?: 'PersonInfo' }
          & Pick<PersonInfo, 'name' | 'position'>
          & { person_photo: (
            { __typename?: 'Image' }
            & Pick<Image, 'ht' | 'wd' | 'id'>
          ) }
        )> }
      )>, florists_type?: Maybe<(
        { __typename?: 'FloristsDataType' }
        & { pricing?: Maybe<(
          { __typename?: 'Spp' }
          & Pick<Spp, 'min_price'>
          & { packages?: Maybe<Array<(
            { __typename?: 'PackageObject' }
            & Pick<PackageObject, 'name' | 'short' | 'min_price' | 'description'>
            & { price?: Maybe<Array<(
              { __typename?: 'PriceObject' }
              & Pick<PriceObject, 'name' | 'price_type' | 'unit'>
              & { fixed?: Maybe<(
                { __typename?: 'FixedObject' }
                & Pick<FixedObject, 'price'>
              )>, range?: Maybe<(
                { __typename?: 'RangeObject' }
                & Pick<RangeObject, 'from_price' | 'to_price'>
              )>, starting?: Maybe<(
                { __typename?: 'StartingObject' }
                & Pick<StartingObject, 'price'>
              )> }
            )>> }
          )>> }
        )>, personInfo?: Maybe<(
          { __typename?: 'PersonInfo' }
          & Pick<PersonInfo, 'name' | 'position'>
          & { person_photo: (
            { __typename?: 'Image' }
            & Pick<Image, 'ht' | 'wd' | 'id'>
          ) }
        )> }
      )>, cakes_desserts_type?: Maybe<(
        { __typename?: 'CakesDessertsDataType' }
        & { pricing?: Maybe<(
          { __typename?: 'Spp' }
          & Pick<Spp, 'min_price'>
          & { packages?: Maybe<Array<(
            { __typename?: 'PackageObject' }
            & Pick<PackageObject, 'name' | 'short' | 'min_price' | 'description'>
            & { price?: Maybe<Array<(
              { __typename?: 'PriceObject' }
              & Pick<PriceObject, 'name' | 'price_type' | 'unit'>
              & { fixed?: Maybe<(
                { __typename?: 'FixedObject' }
                & Pick<FixedObject, 'price'>
              )>, range?: Maybe<(
                { __typename?: 'RangeObject' }
                & Pick<RangeObject, 'from_price' | 'to_price'>
              )>, starting?: Maybe<(
                { __typename?: 'StartingObject' }
                & Pick<StartingObject, 'price'>
              )> }
            )>> }
          )>> }
        )>, personInfo?: Maybe<(
          { __typename?: 'PersonInfo' }
          & Pick<PersonInfo, 'name' | 'position'>
          & { person_photo: (
            { __typename?: 'Image' }
            & Pick<Image, 'ht' | 'wd' | 'id'>
          ) }
        )> }
      )> }
    )>, searchLocations?: Maybe<Array<(
      { __typename?: 'District' }
      & Pick<District, 'name' | 'key'>
      & { cities: Array<(
        { __typename?: 'City' }
        & Pick<City, 'name' | 'key'>
      )> }
    )>>, geo?: Maybe<(
      { __typename?: 'Geo' }
      & Pick<Geo, 'latitude' | 'longitude'>
    )>, frequent_questions?: Maybe<Array<(
      { __typename?: 'FrequentQuestion' }
      & Pick<FrequentQuestion, 'question' | 'answer'>
    )>>, links?: Maybe<(
      { __typename?: 'SocialMedia' }
      & Pick<SocialMedia, 'facebook' | 'instagram' | 'pinterest' | 'website'>
    )>, galleryPhoto?: Maybe<Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'ht' | 'wd' | 'id'>
    )>>, claps?: Maybe<Array<(
      { __typename?: 'Clap' }
      & Pick<Clap, 'name' | 'key' | 'values'>
    )>> }
  )> }
);

export type GetInitialDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInitialDataQuery = (
  { __typename?: 'Query' }
  & { vendorDetailsExtra?: Maybe<(
    { __typename?: 'VendorDetailsExtra' }
    & Pick<VendorDetailsExtra, 'business_name' | 'vendor_type'>
  )> }
);

export type GetDistrictsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDistrictsQuery = (
  { __typename?: 'Query' }
  & { districts: Array<(
    { __typename?: 'LocationNode' }
    & Pick<LocationNode, 'id' | 'name' | 'key' | 'parent_id'>
  )> }
);

export type GetCitiesQueryVariables = Exact<{
  districtId: Scalars['String'];
}>;


export type GetCitiesQuery = (
  { __typename?: 'Query' }
  & { cities: Array<(
    { __typename?: 'LocationNode' }
    & Pick<LocationNode, 'id' | 'name' | 'key' | 'parent_id'>
  )> }
);

export type GetClapStoreQueryVariables = Exact<{
  vendorType: VendorType;
}>;


export type GetClapStoreQuery = (
  { __typename?: 'Query' }
  & { clapStore: Array<(
    { __typename?: 'StoreClap' }
    & Pick<StoreClap, 'name' | 'key' | 'values'>
  )> }
);


export const VendorLoginOtpDocument = gql`
    mutation vendorLoginOtp($phone: String!) {
  vendorLoginOtp(phone: $phone)
}
    `;
export const VendorLoginDocument = gql`
    mutation vendorLogin($phone: String!, $password: String!) {
  vendorLogin(phone: $phone, password: $password)
}
    `;
export const GetVendorProfileIdDocument = gql`
    query getVendorProfileId {
  vendorProfile {
    id
  }
}
    `;
export const GetVendorProfileDocument = gql`
    query getVendorProfile {
  vendorProfile {
    id
    firstName
    lastName
    email
    phone
    verified
  }
}
    `;
export const VendorLogoutDocument = gql`
    mutation vendorLogout {
  vendorLogout
}
    `;
export const IsVendorPhoneExistDocument = gql`
    query isVendorPhoneExist($phone: String!) {
  isVendorPhoneExist(phone: $phone)
}
    `;
export const VendorRegisterOtpDocument = gql`
    mutation vendorRegisterOtp($phone: String!) {
  vendorRegisterOtp(phone: $phone)
}
    `;
export const VendorRegisterDocument = gql`
    mutation vendorRegister($firstName: String!, $lastName: String!, $phone: String!, $password: String!, $authCode: String!) {
  vendorRegister(
    firstName: $firstName
    lastName: $lastName
    phone: $phone
    password: $password
    authCode: $authCode
  )
}
    `;
export const EditVendorDetailsDocument = gql`
    mutation editVendorDetails($businessName: String, $vendorType: VendorType, $address: String, $galleryPhotos: [GalleryPhotoInput!], $frequentQuestion: [FrequentQuestionInput!], $geo: GeoInput, $phone: String, $cityIds: [String!], $facebook: String, $pinterest: String, $instagram: String, $website: String, $claps: [ClapInput!], $description: String, $catererDetails: CatererDetailsInput, $photographerDetails: PhotographerDetailsInput, $venueDetails: VenueDetailsInput, $videographerDetails: VideographerDetailsInput, $bandDjsDetails: BandDjsDetailsInput, $beautyProfessionalsDetails: BeautyProfessionalDetailsInput, $cakesDessertsDetails: CakesDessertsDetailsInput, $floristsDetails: FloristsDetailsInput) {
  vendorEditDetails(
    data: {catererDetails: $catererDetails, photographerDetails: $photographerDetails, venueDetails: $venueDetails, videographerDetails: $videographerDetails, bandDjsDetails: $bandDjsDetails, beautyProfessionalDetails: $beautyProfessionalsDetails, cakesDessertsDetails: $cakesDessertsDetails, floristsDetails: $floristsDetails, businessName: $businessName, vendorType: $vendorType, address: $address, facebook: $facebook, gallery_photos: $galleryPhotos, frequentQuestion: $frequentQuestion, geo: $geo, instagram: $instagram, phone: $phone, pinterest: $pinterest, cityIDs: $cityIds, website: $website, claps: $claps, description: $description}
  )
}
    `;
export const GetVendorDetailsExtraDocument = gql`
    query getVendorDetailsExtra {
  vendorDetailsExtra {
    phone
    description
    address
    listingStatus
    reason
    isLive
    vendorTypes {
      caterer_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      beauty_professionals_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      venue_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
      }
      photographer_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      videographer_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      band_djs_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      florists_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
      cakes_desserts_type {
        pricing {
          min_price
          packages {
            name
            short
            min_price
            description
            price {
              name
              price_type
              fixed {
                price
              }
              range {
                from_price
                to_price
              }
              starting {
                price
              }
              unit
            }
          }
        }
        personInfo {
          name
          position
          person_photo {
            ht
            wd
            id
          }
        }
      }
    }
    searchLocations {
      name
      key
      cities {
        name
        key
      }
    }
    geo {
      latitude
      longitude
    }
    frequent_questions {
      question
      answer
    }
    vendor_type
    links {
      facebook
      instagram
      pinterest
      website
    }
    business_name
    galleryPhoto {
      ht
      wd
      id
    }
    claps {
      name
      key
      values
    }
    isComplete
  }
}
    `;
export const GetInitialDataDocument = gql`
    query getInitialData {
  vendorDetailsExtra {
    business_name
    vendor_type
  }
}
    `;
export const GetDistrictsDocument = gql`
    query getDistricts {
  districts {
    id
    name
    key
    parent_id
  }
}
    `;
export const GetCitiesDocument = gql`
    query getCities($districtId: String!) {
  cities(districts_id: $districtId) {
    id
    name
    key
    parent_id
  }
}
    `;
export const GetClapStoreDocument = gql`
    query getClapStore($vendorType: VendorType!) {
  clapStore(vendorType: $vendorType) {
    name
    key
    values
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();
const VendorLoginOtpDocumentString = print(VendorLoginOtpDocument);
const VendorLoginDocumentString = print(VendorLoginDocument);
const GetVendorProfileIdDocumentString = print(GetVendorProfileIdDocument);
const GetVendorProfileDocumentString = print(GetVendorProfileDocument);
const VendorLogoutDocumentString = print(VendorLogoutDocument);
const IsVendorPhoneExistDocumentString = print(IsVendorPhoneExistDocument);
const VendorRegisterOtpDocumentString = print(VendorRegisterOtpDocument);
const VendorRegisterDocumentString = print(VendorRegisterDocument);
const EditVendorDetailsDocumentString = print(EditVendorDetailsDocument);
const GetVendorDetailsExtraDocumentString = print(GetVendorDetailsExtraDocument);
const GetInitialDataDocumentString = print(GetInitialDataDocument);
const GetDistrictsDocumentString = print(GetDistrictsDocument);
const GetCitiesDocumentString = print(GetCitiesDocument);
const GetClapStoreDocumentString = print(GetClapStoreDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    vendorLoginOtp(variables: VendorLoginOtpMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: VendorLoginOtpMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<VendorLoginOtpMutation>(VendorLoginOtpDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'vendorLoginOtp');
    },
    vendorLogin(variables: VendorLoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: VendorLoginMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<VendorLoginMutation>(VendorLoginDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'vendorLogin');
    },
    getVendorProfileId(variables?: GetVendorProfileIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: GetVendorProfileIdQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetVendorProfileIdQuery>(GetVendorProfileIdDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVendorProfileId');
    },
    getVendorProfile(variables?: GetVendorProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: GetVendorProfileQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetVendorProfileQuery>(GetVendorProfileDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVendorProfile');
    },
    vendorLogout(variables?: VendorLogoutMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: VendorLogoutMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<VendorLogoutMutation>(VendorLogoutDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'vendorLogout');
    },
    isVendorPhoneExist(variables: IsVendorPhoneExistQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: IsVendorPhoneExistQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<IsVendorPhoneExistQuery>(IsVendorPhoneExistDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'isVendorPhoneExist');
    },
    vendorRegisterOtp(variables: VendorRegisterOtpMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: VendorRegisterOtpMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<VendorRegisterOtpMutation>(VendorRegisterOtpDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'vendorRegisterOtp');
    },
    vendorRegister(variables: VendorRegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: VendorRegisterMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<VendorRegisterMutation>(VendorRegisterDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'vendorRegister');
    },
    editVendorDetails(variables?: EditVendorDetailsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: EditVendorDetailsMutation | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<EditVendorDetailsMutation>(EditVendorDetailsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'editVendorDetails');
    },
    getVendorDetailsExtra(variables?: GetVendorDetailsExtraQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: GetVendorDetailsExtraQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetVendorDetailsExtraQuery>(GetVendorDetailsExtraDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getVendorDetailsExtra');
    },
    getInitialData(variables?: GetInitialDataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: GetInitialDataQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetInitialDataQuery>(GetInitialDataDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getInitialData');
    },
    getDistricts(variables?: GetDistrictsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: GetDistrictsQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetDistrictsQuery>(GetDistrictsDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDistricts');
    },
    getCities(variables: GetCitiesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: GetCitiesQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetCitiesQuery>(GetCitiesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCities');
    },
    getClapStore(variables: GetClapStoreQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<{ data?: GetClapStoreQuery | undefined; extensions?: any; headers: Dom.Headers; status: number; errors?: GraphQLError[] | undefined; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetClapStoreQuery>(GetClapStoreDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getClapStore');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;