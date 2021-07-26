import {Args, ArgsType, Field, ObjectType, Query, Resolver} from 'type-graphql';
import {ProvinceModel} from '../models/Location';
import {ClapStoreModel} from '../models/stores/ClapStore';
import {VendorType} from '../common/const';

@ObjectType()
class StoreClap {
    @Field()
    name: string;

    @Field()
    key: string;

    @Field(() => [String])
    values: string[];
}

@ArgsType()
class ClapStoreArgs {
    @Field(() => VendorType)
    vendorType: VendorType;
}

@Resolver()
export class StoreResolver {
    @Query(() => [StoreClap])
    async clapStore(
        @Args() {vendorType}: ClapStoreArgs,
    ): Promise<StoreClap[]> {
        return await ClapStoreModel.find({vendor_type: vendorType});
    }
}