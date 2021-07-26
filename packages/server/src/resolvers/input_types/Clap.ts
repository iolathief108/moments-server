import {Field, InputType} from 'type-graphql';
import {VendorDataDoc} from '../../models/VendorData';
import {VendorType} from '../../common/const';

@InputType()
export class ClapInput {
    @Field(() => String, {nullable: false})
    name: string;

    @Field(() => String, {nullable: false})
    key: string;

    @Field(() => [String], {nullable: false})
    values: string[];

}