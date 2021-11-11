import {modelOptions, prop} from '@typegoose/typegoose';
import {registerEnumType} from 'type-graphql';


@modelOptions({options: {customName: 'fixed_price'}})
class FixedSchema {
    @prop({required: false, type: () => Number})
    price: number;
}

@modelOptions({options: {customName: 'starting_price'}})
class StartingSchema {
    @prop({required: false, type: () => Number})
    price: number;
}

@modelOptions({options: {customName: 'range_price'}})
class RangeSchema {
    @prop({required: false, type: () => Number})
    from_price: number;

    @prop({required: false, type: () => Number})
    to_price: number;
}

export enum ServicePriceType {
    Fixed = 'Fixed',
    Range = 'Range',
    Starting = 'Starting',
}

registerEnumType(ServicePriceType, {
    name: 'ServicePriceType',
});


@modelOptions({options: {customName: 'service_price'}})
export class ServicePrice {
    @prop({required: true, type: () => String, enum: Object.values(ServicePriceType)})
    price_type: ServicePriceType;

    @prop({required: false, type: () => String})
    product?: string;

    @prop({required: false, type: () => FixedSchema})
    fixed?: FixedSchema;

    @prop({required: false, type: () => RangeSchema})
    range?: RangeSchema;

    @prop({required: false, type: () => StartingSchema})
    starting?: StartingSchema;

    @prop({required: false, type: () => String})
    class?: string;


    @prop({required: false, type: () => String})
    unit?: string;
}


@modelOptions({options: {customName: 'service_pricing'}})
export class ServicePricing {
    @prop({required: true, type: () => String})
    name: string;

    @prop({required: true, type: () => [ServicePrice]})
    service_prices: ServicePrice[];

    @prop({required: false, type: () => Number})
    min_spend?: number;
}
