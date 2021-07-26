require('dotenv').config()
import {InitDatabase} from "./initDatabase";
import {create_sfmv_store, createClapStore, createVendors} from './database';
import initDb from "../init-db";

(async () => {
    await initDb()
    // await InitDatabase();
    // await create_sfmv_store();
    await createVendors(100)
    // await createClapStore()
    process.exit();
})();
