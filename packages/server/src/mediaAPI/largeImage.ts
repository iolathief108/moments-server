import {FastifyInstance} from 'fastify/types/instance';
import fs from 'fs';
import path from 'path';
import {makeID} from '../lib/makeID';
import {IMAGE_PATH, TEMP_PATH} from '../common/const';
import moment from 'moment';
import move from '../lib/move';
import imageSize from 'image-size';
import sharp from 'sharp';

let _tokens: {
    token: string;
    expire: Date;
}[] = [];

// TODO: system initialization process should contain cleanup of temp files (only for dev server)
type Options = {
    /** this must start with a slash */
    path: string;
};

export async function uploadCacheImage(
    fastifyInstance: FastifyInstance,
    opts: Options,
): Promise<void> {
    //TODO: check vendor logged in
    if (!opts.path) throw new Error('path cannot be empty');
    fastifyInstance.post(opts.path, async (req, reply) => {
        const file = await req.file();

        //check extension
        let res = file.filename.match(
            /^(.+\.)(jpg|JPG|png|PNG|jpeg|JPEG|webp|WEBP)$/,
        );
        if (!res || res.length < 2) {
            throw new Error('The uploaded file is unrecognizable!');
        }

        const dim = imageSize(await file.toBuffer());
        if (dim.height < 350 || dim.width < 350) {
            throw new Error('image height and width should be greater than 300px')
        }

        const extension = file.filename.match(
            /^(.+\.)(jpg|JPG|png|PNG|jpeg|JPEG|webp|WEBP)$/,
        )[2];
        const token = makeID(13, false) + '.' + extension;

        _tokens.push({
            token,
            expire: moment(new Date()).add(120, 'm').toDate(),
        });
        fs.writeFile(
            path.resolve(TEMP_PATH + token),
            await file.toBuffer(),
            'binary',
            err => (err && console.log(err)),
        );
        return {
            token,
        };
    });
}

export function tokenExists(token: string) {
    for (const _token of _tokens) if (_token.token === token) return true;
    return false;
}

export async function commit(token: string) {
    const tokenThing = _tokens.find((t) => t.token === token);
    const id = makeID(13, false);
    const tImg = TEMP_PATH + tokenThing.token;
    if (!fs.existsSync(tImg)) {
        return false;
    }

    // Remove token from the list
    _tokens = _tokens.filter(value => value.token !== token);

    let jpgImage = await sharp(tImg).jpeg().toBuffer();
    fs.writeFileSync(
        path.resolve(IMAGE_PATH + id),
        jpgImage,
        {
            encoding: 'binary',
        },
    );
    const dim = imageSize(tImg);

    //delete tImg
    fs.unlink(tImg, err => err && console.log(err));

    return {
        id,
        ht: dim.height,
        wd: dim.width,
    };
}

export function deleteImage(token: string) {
    // TODO: delete large image
}
