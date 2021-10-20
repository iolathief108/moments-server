import {Field, ObjectType} from 'type-graphql';
import {PriceType} from '../../models/Spp';


@ObjectType()
export class FixedObject {
    @Field(() => Number, {nullable: true})
    price: number;
}

@ObjectType()
export class StartingObject {
    @Field(() => Number, {nullable: true})
    price: number;
}

@ObjectType()
export class RangeObject {
    @Field(() => Number, {nullable: true})
    from_price: number;

    @Field(() => Number, {nullable: true})
    to_price: number;
}

@ObjectType()
export class PriceObject {
    @Field(() => String, {nullable: true})
    name: string;

    @Field(() => PriceType, {nullable: false})
    price_type: PriceType;

    @Field(() => FixedObject, {nullable: true})
    fixed: FixedObject;

    @Field(() => RangeObject, {nullable: true})
    range: RangeObject;

    @Field(() => StartingObject, {nullable: true})
    starting: StartingObject;

    @Field(() => String, {nullable: true})
    unit: string;
}

@ObjectType()
export class PackageObject {
    @Field(() => String, {nullable: true})
    name: string;

    @Field(() => String, {nullable: true})
    short: string;

    @Field(() => Number, {nullable: true})
    min_price: number;

    @Field(() => String, {nullable: true})
    description: string;

    @Field(() => [PriceObject], {nullable: true})
    price: PriceObject[];
}

@ObjectType()
export class Spp {
    @Field(() => Number, {nullable: true})
    min_price: number;

    @Field(() => [PackageObject], {nullable: true})
    packages: PackageObject[];
}
