import fs from 'fs-extra';
import path from 'path';
import {chooseOne} from './utils';
import {permanent_file_location} from '../common/const';
import imageSize from 'image-size';

// todo: need some comments

type VendorType = 'venue' | 'photographer' | 'caterer';
type Other = 'default' | 'card' | 'gallery';
type ImageType = VendorType | Other;
export type DirNames = (ImageType | string)[];
type DirectoryNode = {dir: string; childs?: DirectoryNode[]};

function getDirectoryTree(basePath: string) {
    const anyDirectory = function (dir: string) {
        let files = fs.readdirSync(dir);
        let s = false;
        files.forEach(function (file) {
            if (fs.statSync(dir + file).isDirectory()) {
                s = true;
            }
        });
        return s;
    };

    const talkSync = function (node: DirectoryNode) {
        let files = fs.readdirSync(node.dir);
        files.forEach(function (file) {
            if (fs.statSync(node.dir + file).isDirectory()) {
                if (anyDirectory(node.dir + file + '/')) {
                    if (!node.childs) node.childs = [];
                    node.childs.push(talkSync({dir: node.dir + file + '/'}));
                } else {
                    if (!node.childs) node.childs = [];
                    node.childs.push({dir: node.dir + file + '/'});
                }
            }
        });
        return node;
    };

    return talkSync({dir: basePath});
}

function getFileCount(path: string): number {
    if (!fs.existsSync(path)) return 0;
    const files = fs.readdirSync(path);
    let fileCount = 0;
    for (const file of files) {
        if (!fs.statSync(path + file).isDirectory()) fileCount++;
    }
    return fileCount;
}

function getImageDirectory(dirNames: DirNames, basePath?: string) {
    // const r = getCache(dirNames, basePath);
    // if (r) return r;

    if (!basePath) {
        basePath = './static/debug/';
    }
    let imagePath = basePath;
    let deepCount = 0;
    for (const name of dirNames) {
        if (!fs.existsSync(imagePath + name + '/')) {
            break;
        }
        imagePath += name + '/';
        deepCount++;
    }
    for (let i = 0; i < deepCount; i++) {
        let len = dirNames.length - i;
        let imagePath = basePath;

        for (let j = 0; j < len; j++) {
            imagePath += dirNames[j] + '/';
        }
        if (getFileCount(imagePath) >= 3) {
            // caches.push({dirNames, basePath, res: imagePath});
            return imagePath;
        }
    }

    // caches.push({dirNames, basePath, res: basePath + 'default/'});
    return basePath + 'default/';
}

function getAvailableFilePaths(dir: string) {
    let filesDirs = fs.readdirSync(dir);
    let filePaths = [];
    for (const file of filesDirs) {
        if (fs.statSync(dir + file).isDirectory()) continue;
        filePaths.push(dir + file);
    }
    return filePaths;
}

let caches: {
    keyWords: DirNames;
    res: string[];
}[] = [];

function getCache(dirNames: DirNames): null | string[] {
    for (const cache of caches) {
        if (cache.keyWords === dirNames) {
            return cache.res;
        }
    }
    return null;
}

function getImagePath(...keyWords: DirNames): string {
    // check cache
    const cache = getCache(keyWords);
    if (cache) return chooseOne(cache);

    if (!keyWords) keyWords = ['default'];
    const imageDirectory = getImageDirectory(keyWords);
    const availableFilePaths = getAvailableFilePaths(imageDirectory);

    // put it into the cache
    caches.push({keyWords, res: availableFilePaths});

    return chooseOne(availableFilePaths);
}

export function createImage(name: string, ...keywords: DirNames) {
    const imagePath = getImagePath(...keywords);

    const p = path.resolve(imagePath)
    fs.copySync(
        p,
        path.resolve(permanent_file_location + name),
    );
    return imageSize(p)
}

/*
 *
 *
 *
 * argument('image_name1.jpg', 'photographer','gallery') => will
 * create an image called image_name1.jpg and it will try to use image in
 * /photographer/gallery/ directory otherwise it will use some random image
 * */
