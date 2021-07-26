import {FastifyInstance} from "fastify/types/instance";
import fs from "fs";
import path from 'path'
import {makeID} from "../lib/makeID";
import {IMAGE_PATH, TEMP_PATH} from "../common/const";
import moment from "moment";
import move from "../lib/move";
import imageSize from 'image-size';

let _tokens: {
    token: string;
    extension: string;
    expire: Date;
}[] = [];
// TODO: system initialization process should contain cleanup of temp files (only for dev server)
type options = {
    /** must start with a slash */
    path: string;
};

function getUniqueImageName() {
    //TODO: make sure generated name doesn't exist
    return makeID(10, false);
}

export async function uploadCacheImage(
    fastifyInstance: FastifyInstance,
    opts: options,
): Promise<void> {
    //TODO: check vendor logged in
    if (!opts.path) throw new Error("path cannot be empty");
    fastifyInstance.post(opts.path, async (req, reply) => {
        const file = await req.file();
        const token = makeID(13, false);
        const extension = file.filename.match(
            /^(.+\.)(jpg|JPG|png|PNG|jpeg|JPEG)$/,
        )[2];
        // TODO: important check for ext and throw error, support webp
        _tokens.push({
            token,
            extension,
            expire: moment(new Date()).add(120, "m").toDate(),
        });
        fs.writeFile(
            path.resolve(TEMP_PATH + token + "." + extension),
            await file.toBuffer(),
            "binary",
            (err) => (err ? console.log(err) : null),
        );
        return {
            token,
        };
    });
}

export function checkTokenExist(token: string) {
    for (const _token of _tokens) if (_token.token === token) return true;
    return false;
}

export function commitAndGetUrl(token: string) {
    const tokenThing = _tokens.find((t) => t.token === token);
    const id = getUniqueImageName();
    const tImg = TEMP_PATH + tokenThing.token + "." + tokenThing.extension
    move(
        path.resolve(tImg),
        path.resolve(IMAGE_PATH + id),
        (err) => {
            err ? console.log(err) : null;
        },
    );
    _tokens = _tokens.filter(value => value.token !== token)

    const dim = imageSize(tImg)
    return {
        id,
        ht: dim.height,
        wd: dim.width
    };
}

export function deleteLargeImage(url: string){
    // TODO: delete large image
}
