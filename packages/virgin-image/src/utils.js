const sharp = require('sharp');
const fs = require('fs');

function coinToss() {
    return Math.round(Math.random() + 0.35);
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

function getTransformerPipeline(data) {
    let [, x, y, q, j] = data;
    let thing = sharp();

    if (x && y) thing = thing.resize(x, y);

    if (q && j) thing = thing.jpeg({quality: q});
    else if (q && !j) thing = thing.webp({quality: q});
    else if (!q && j) thing = thing.jpeg();
    else if (!q && !j) thing = thing.webp();

    return thing;
}
const cachePath = process.env.VERGIN_CACHE_PATH
const permPath = process.env.VERGIN_IMAGE_PATH
function getCacheImagePath(uri) {
    return cachePath + uri;
}

function getReadStream(p) {
    const path =  permPath + p[0];
    if (!fs.existsSync(path)) return false;
    return fs.createReadStream(path);
}

function getCacheReadStream(I) {
    const path = cachePath + I;
    if (fs.existsSync(path)) return fs.createReadStream(path);
    return false;
}

module.exports = {
    sleep,
    coinToss,
    getTransformerPipeline,
    getReadStream,
    getCacheImagePath,
    getCacheReadStream
};























