import {modelOptions, prop} from '@typegoose/typegoose';
import {registerEnumType} from 'type-graphql';
import {ListingStatus} from '../common/const';

//todo; some naming
@modelOptions({options: {customName: 'fixed_price'}})
export class FixedSchema {
    @prop({required: false, type: () => Number})
    price: number;
}

@modelOptions({options: {customName: 'starting_price'}})
export class StartingSchema {
    @prop({required: false, type: () => Number})
    price: number;
}

@modelOptions({options: {customName: 'range_price'}})
export class RangeSchema {
    @prop({required: false, type: () => Number})
    from_price: number;

    @prop({required: false, type: () => Number})
    to_price: number;
}

export enum PriceType {
    fixed = 'fixed',
    range = 'range',
    starting = 'starting',
}

registerEnumType(PriceType, {
    name: 'PriceType',
});

@modelOptions({options: {customName: 'package_price'}})
export class PriceSchema {
    @prop({required: false, type: () => String})
    name: string;

    @prop({required: true, type: () => String, enum: Object.values(PriceType)})
    price_type: PriceType;

    @prop({required: false, type: () => FixedSchema})
    fixed: FixedSchema;

    @prop({required: false, type: () => RangeSchema})
    range: RangeSchema;

    @prop({required: false, type: () => StartingSchema})
    starting: StartingSchema;

    @prop({required: false, type: () => String})
    unit: string;
}

@modelOptions({options: {customName: 'spp_package'}})
export class PackageSchema {
    @prop({required: false, type: () => String})
    name: string;

    @prop({required: false, type: () => String})
    short: string;

    @prop({required: false, type: () => Number})
    min_price: number;

    @prop({required: false, type: () => String})
    description: string;

    @prop({required: false, type: () => [PriceSchema]})
    price: PriceSchema[];
}

@modelOptions({options: {customName: 'spp'}})
export class SppSchema {
    @prop({required: false, type: () => Number})
    min_price: number;

    @prop({required: false, type: () => [ PackageSchema ]})
    packages: PackageSchema[];
}
