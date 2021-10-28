import polka from 'polka';
import fs from 'fs';
import {parser} from './parser';
import {
    getReadStream,
    getTransformerPipeline,
    getCacheImagePath,
    getCacheReadStream,
} from './utils';

polka({
    onError(err, req, res, next) {
        res.statusCode = 404;
        res.end("Oh dear, this link isn't working.");
        console.log(err);
    },
})
    .get('/p/:name', (req, res) => {
        const I = req.params.name;

        // If you use reverse proxy to serve the cache file,
        // delete or comment the following five lines
        const done = getCacheReadStream(I);
        if (done) {
            done.pipe(res);
            return;
        }

        const P = parser(I);

        if (!P || P[1] > 6000 || P[2] > 6000) {
            res.statusCode = 404;
            fs.createReadStream('./vergin/static/no-image.jpg').pipe(res);
            return;
        }

        const readStr = getReadStream(P);
        if (!readStr) {
            res.statusCode = 404;
            fs.createReadStream('./vergin/static/no-image.jpg').pipe(res);
            return;
        }

        if (
            P[0] &&
            P[1] === null &&
            P[2] === null &&
            P[3] === null &&
            P[4] === true
        ) {
            readStr.pipe(res);
            return;
        }

        const pipeline = getTransformerPipeline(P);
        const cachePath = getCacheImagePath(I);

        pipeline.clone().pipe(res);
        pipeline.toFile(cachePath);

        readStr.pipe(pipeline);
    })
    //@ts-ignore
    .listen(process.env.VERGIN_PORT, () => {
        console.log(`Vergin Running on localhost ${process.env.VERGIN_PORT}`);
    });

export {}