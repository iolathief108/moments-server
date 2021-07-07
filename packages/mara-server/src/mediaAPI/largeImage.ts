import {FastifyInstance} from "fastify/types/instance";
import fs from "fs";
import {makeID} from "../lib/makeID";
import {permanent_file_location, temp_file_location} from "../common/const";
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
        _tokens.push({
            token,
            extension,
            expire: moment(new Date()).add(120, "m").toDate(),
        });
        fs.writeFile(
            temp_file_location + token + "." + extension,
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
    move(
        temp_file_location + tokenThing.token + "." + tokenThing.extension,
        permanent_file_location + id,
        (err) => {
            err ? console.log(err) : null;
        },
    );
    _tokens = _tokens.filter(value => value.token !== token)

    const dim = imageSize(permanent_file_location+id)
    return {
        id,
        ht: dim.height,
        wd: dim.width
    };
}

export function deleteLargeImage(url: string){
    // TODO: delete large image
}
