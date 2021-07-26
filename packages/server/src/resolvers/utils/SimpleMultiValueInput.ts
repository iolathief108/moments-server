import {Field, InputType} from "type-graphql";
import {ArrayMinSize, Length, Validate, ValidateNested} from "class-validator";
import { IsObjectID } from "../../validators";

@InputType()
export class SimpleMultiValueInput {
    @Field(() => String)
    name: string;

    @Field(() => [String])
    @ArrayMinSize(1)
    values: string[];
}




//todo: the name SimpleFilterValue SimpleFilterMultiValue are confusing, consider changing the name
@InputType()
class SimpleFilterValue {
    //todo: check for correct name format
    @Field(() => String, {nullable: true})
    @Length(2)
    name?: string;

    @Field(() => String, {nullable: true})
    @Validate(IsObjectID)
    storeID?: string;
}

@InputType()
class SimpleFilterMultiValue {
    //todo: validate the correct object id
    @Field(() => String)
    @Validate(IsObjectID)
    storeID: string;

    @Field(() => [SimpleFilterValue])
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    simpleFilterValues: SimpleFilterValue[];
}
