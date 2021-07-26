require('dotenv').config()
import "reflect-metadata";
import fastify from "./fastify";
import initDb from './init-db'


async function main() {

    await initDb();

    const app = await fastify({
        logger: false,
    });

    app.listen({port: 4000}, () => {
        console.log("running.....");
    });
}

main();
