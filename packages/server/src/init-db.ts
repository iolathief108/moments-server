import mongoose from "mongoose";
import { IS_DEV } from "./utils";

export default async function () {
    const host = process.env.DB_HOST || 'localhost:27017';
    const dbName = process.env.DB_NAME || (IS_DEV ? 'mara-dev' : 'mara');

    const userName = process.env.DB_USER;
    const pass = process.env.DB_PASS;

    const url = 'mongodb://' +
        (userName || pass ? (userName || '') + (userName && pass && ':' + pass) + '@' : '') +
        host;

    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        dbName: dbName
    });
}
