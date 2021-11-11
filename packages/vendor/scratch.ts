import {ServicePriceType, ServicePricing} from '../shared';


let servicePricing: ServicePricing = {
    name: 'hello',
    min_spend: 333,
    service_prices: [
        {
            product: 'asdf',
            class: '',
            unit: '2333',

            price_type: ServicePriceType.Fixed,
            fixed: {
                price: 333,
            },
            range: {
                from_price: 333,
                to_price: 33,
            },
            starting: {
                price: 3332,
            },
        },
    ],
};

function testFunction(duma: ServicePricing) {
    let thing = '';
    for (let i = 0; i < duma.service_prices.length; i++) {
        const servicePrice = duma.service_prices[i];

        if (servicePrice.product)
            thing += servicePrice.product;
        switch (servicePrice.price_type) {
            case ServicePriceType.Fixed:
                thing += ' at' + servicePrice.fixed.price;
                break;
            case ServicePriceType.Starting:
                thing += ' start at' + servicePrice.starting.price;
                break;
            case ServicePriceType.Range:
                thing += ' at' + servicePrice.range.from_price + '-' + servicePrice.range.to_price;
                break;
        }
        if (servicePrice.unit) {
            thing += ' per' + servicePrice.unit;
        }
        if (servicePrice.class) {
            thing += ' for' + servicePrice.class;
        }
        if ((i + 1) < duma.service_prices.length) {
            thing += ' and ';
        }
    }
    return thing
}

console.log(
    testFunction(servicePricing)
)
