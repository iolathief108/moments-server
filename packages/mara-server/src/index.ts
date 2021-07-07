import "reflect-metadata";
import fastify from "./fastify";
import mongoose from "mongoose";

async function main() {
    await mongoose.connect("mongodb://localhost:27017/zola_test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    const app = await fastify({
        logger: false,
    });

    app.listen({port: 4000}, () => {
        console.log("running.....");
    });
}

main();
