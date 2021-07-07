import Gallery, {RenderImageProps} from 'react-photo-gallery';
import {VendorDetailsBQuery} from '../../../http/generated';
import {useCallback, useEffect, useState} from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


function buildUrl(str: string, ht: number, wd: number) {
    return `https://www.zola.lk/image01/${str}_${wd}x${ht}.webp`;
}

const SIZES = [
    //portrait
    {ht: 500, wd: 400},
    {ht: 500, wd: 300},
    {ht: 600, wd: 400},
    //wide
    {ht: 400, wd: 500},
    {ht: 400, wd: 600},
    {ht: 500, wd: 500},
];

function chooseNear(goal: number, counts: number[]) {
    return counts.reduce(function (prev, curr) {
        return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
    });
}

function port(ht: number, wd: number) {
    const isWide = wd > ht;
    const ar = isWide ? ht / wd : wd / ht;

    const fixedArs = SIZES.filter(item => isWide ? item.wd > item.ht : item.ht > item.wd)
        .map(val => isWide ? val.ht / val.wd : val.wd / val.ht);

    const wow = chooseNear(ar, fixedArs);

    return SIZES.find(val => isWide ? val.wd > val.ht && val.ht / val.wd === wow : val.ht > val.wd && val.wd / val.ht === wow) ?? SIZES[2];
}


export function GallerySection({data}: {data: VendorDetailsBQuery}) {

    const [isOpen, setOpen] = useState(false);
    const [photoIndex, setIndex] = useState(0);
    const [images, setImages] = useState(data.vendorDetailsB?.galleryPhoto.map(item => `https://www.zola.lk/image01/${item.id}.webp`) ?? [])
    // const images = ;

    useEffect(()=>{
        setImages(data.vendorDetailsB?.galleryPhoto.map(item => `https://www.zola.lk/image01/${item.id}_q90.jpg`) ?? [])
    }, [data])

    function getPhotos() {
        return data?.vendorDetailsB?.galleryPhoto.map(item => {
                let dd = port(item.ht, item.wd);
                return {
                    src: (() => {
                        return buildUrl(item.id, dd.ht, dd.wd);
                    })(),
                    width: dd.wd,
                    height: dd.ht,
                };
            },
        ) ?? [];
    }

    const imageRenderer = useCallback(
        ({index, left, top, photo, margin}: RenderImageProps) => {
            return (
                <img style={{
                    display: 'block',
                    margin: `${margin}px`,
                    cursor: 'pointer',
                }} src={photo.src} key={index}
                     onClick={ () => {
                         console.log(index)
                         console.log(images);
                         setIndex(index)
                         setOpen(true)
                     }}
                     width={photo.height <= 500 ? photo.width : photo.width * 500 / photo.height}
                     height={photo.height <= 500 ? photo.height : 500}/>
            );
        }, [],
    );

    return (
        <div>
            <div className={'container'}>
                <div className={'row'}>
                    <div className="col-md-12 col-sm-12">
                        <Gallery
                            renderImage={imageRenderer}
                            columns={2}
                            targetRowHeight={400}
                            direction="row"
                            photos={getPhotos()}/>
                    </div>
                </div>
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setOpen(false)}
                    onMovePrevRequest={() =>
                        setIndex((photoIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                        setIndex((photoIndex + 1) % images.length)
                    }
                />
            )}
        </div>

    );
}