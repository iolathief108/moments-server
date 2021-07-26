import {buildSchema} from 'type-graphql';
import {VendorRegisterResolver} from './resolvers/VendorRegister';
import {VendorProfileResolver} from './resolvers/VendorProfile';
import authChecker from './authChecker';
import {VendorEditDetailsResolver} from './resolvers/VendorEditDetails';
import {VendorSearchResolver} from './resolvers/VendorSearch';
import {VendorDetailsResolver} from './resolvers/VendorDetails';
import {LocationResolver} from './resolvers/Location';
import {StoreResolver} from './resolvers/Store';

export default async () => {
    const schema = await buildSchema({
        resolvers: [
            VendorRegisterResolver,
            VendorProfileResolver,
            VendorEditDetailsResolver,
            VendorSearchResolver,
            VendorDetailsResolver,
            LocationResolver,
            StoreResolver,
        ],
        authChecker,
        // emitSchemaFile: {
        //     path: __dirname + "/schema.graphql",
        //     commentDescriptions: true,
        //     sortedSchema: true,
        // },
    });

    return schema;
};


