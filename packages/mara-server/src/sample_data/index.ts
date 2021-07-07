import mongoose from "mongoose";
import {InitDatabase} from "./initDatabase";
import {create_sfmv_store, createVendors} from "./database";

(async () => {
    await mongoose.connect("mongodb://localhost:27017/zola_test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    // await InitDatabase();
    // await create_sfmv_store();
    await createVendors(100)

    process.exit();
})();
