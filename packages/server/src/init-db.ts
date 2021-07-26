import mongoose from "mongoose";

export default async function () {
    const host = process.env.DB_HOST || 'localhost';
    const env = process.env.NODE_ENV;
    if (!env || !(env === 'development' || env === 'production')) {
        throw new Error('env is required');
    }
    const dbName = env === 'development' ? 'mara-dev' : 'mara';

    await mongoose.connect(`mongodb://${host}:27017/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
}