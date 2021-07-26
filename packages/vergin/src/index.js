require('dotenv-safe').config();
const polka = require('polka');
const fs = require('fs');
const { parser } = require('./parser');
const {
    getReadStream,
    getTransformerPipeline,
    getCacheImagePath,
    getCacheReadStream
} = require('./utils');






polka({
    onError(err, req, res, next) {
        res.statusCode = 404;
        res.end('Oh dear, this link isn\'t working.');
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

        if (!P) {
            res.statusCode = 404;
            fs.createReadStream('./static/no-image.jpg').pipe(res);
            return;
        }

        const readStr = getReadStream(P);
        if (!readStr) {
            res.statusCode = 404;
            fs.createReadStream('./static/no-image.jpg').pipe(res);
            return;
        }

        if (P[0]
            && P[1] === null
            && P[2] === null
            && P[3] === null
            && P[4] === true) {
            readStr.pipe(res);
            return;
        }

        const pipeline = getTransformerPipeline(P);
        const cachePath = getCacheImagePath(I);

        pipeline.clone().pipe(res);
        pipeline.toFile(cachePath);

        readStr.pipe(pipeline);
    })
    .listen(process.env.VERGIN_PORT, () => {
        console.log(`Running on localhost ${process.env.VERGIN_PORT}`);
    });
