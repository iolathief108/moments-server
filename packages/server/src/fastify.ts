import fastify, {FastifyInstance, FastifyServerOptions} from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifySession from 'fastify-session';
import Redis from 'ioredis';
import cors from 'fastify-cors';
import {uploadCacheImage} from './mediaAPI/largeImage';
import fastifyMultipart from 'fastify-multipart';
import mercurius from 'mercurius';
import apollo from './apollo';
import {TEMP_PATH} from './common/const';
import * as fs from 'fs';
import {IS_DEV} from './utils';
import {mailForm} from './mail';


const RedisStore = require('connect-redis')(fastifySession);


// const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379";
const SESSION_TTL = 864e3 * 365; // 365 day in seconds

export const redis = new Redis();

export default async (options?: FastifyServerOptions): Promise<FastifyInstance> => {
    const app = fastify(options);

    app.register(mercurius, {
        schema: await apollo(),
        graphiql: 'playground',
        context: (request, reply) => ({
            request,
            reply,
        }),
        path: '/api/',
        subscription: true,
    });

    app.register(fastifyMultipart);

    app.register(uploadCacheImage, {
        path: '/api/upload_cache_image/',
    });

    app.post('/api/mail', (request, reply) => {
        if (typeof request.body === 'string')
            mailForm(request.body);
        reply.send({success: true});
    });

    app.register(fastifyCookie);
    app.get('/api/tmp-img/:token', (req, reply) => {
        //@ts-ignore
        if (!req.params.token) throw new Error('token is must');
        //@ts-ignore
        let imgPath = TEMP_PATH + req.params.token;
        if (!fs.existsSync(imgPath)) throw new Error('file not exist');

        const file = fs.createReadStream(imgPath);
        reply.type('image/jpeg').send(file);
    });
    app.register(fastifySession, {
        store: new RedisStore({client: redis, ttl: SESSION_TTL}),
        secret: 'a8d90as8d7f8os8i5u3sd9f8a9sdf8a2df98',
        // saveUninitialized: true,
        cookieName: 'qid',
        cookie: {
            // httpOnly: true,
            secure: 'auto',
            // path: '/',
            maxAge: SESSION_TTL,
        },

    });

    if (!IS_DEV) {
        app.register(cors, {
            credentials: true,
        });
    }

    return app;
};
