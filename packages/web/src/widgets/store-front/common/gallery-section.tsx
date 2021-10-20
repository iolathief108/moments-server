import Gallery, { RenderImageProps } from 'react-photo-gallery';
import { VendorDetailsBQuery } from '../../../http/generated';
import { useCallback, useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { isMobile } from 'react-device-detect';


function buildUrl(str: string, ht: number, wd: number, q?: number) {

    // return `/p/${str}_q90.jpg`;
    // if (q) return `/p/${str}_${wd}x${ht}q${q}.jpg`;
    return `/p/${str}_${wd}x${ht}.jpg`;
}

const SIZES = [
    //portrait
    { ht: 1000, wd: 700 },
    { ht: 1000, wd: 500 },

    { ht: 800, wd: 600 },
    { ht: 800, wd: 400 },
    { ht: 600, wd: 400 },
    // { ht: 600, wd: 300 },
    // { ht: 500, wd: 300 },
    // { ht: 500, wd: 240 },
    // { ht: 400, wd: 250 },
    // { ht: 400, wd: 200 },
    // { ht: 300, wd: 180 },

    //wide
    { wd: 1000, ht: 800},
    { ht: 800, wd: 700 },
    { ht: 500, wd: 500 },
    { ht: 350, wd: 350 },

    // { ht: 200, wd: 300 },
    // { ht: 250, wd: 300 },
    // { ht: 150, wd: 300 },
    // { ht: 100, wd: 300 },
    // { ht: 350, wd: 400 },
    // { ht: 300, wd: 400 },
    // { ht: 250, wd: 400 },
    // { ht: 200, wd: 400 },
    // { ht: 150, wd: 400 },
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

    const size = SIZES.find(val => isWide ? val.wd > val.ht && val.ht / val.wd === wow : val.ht > val.wd && val.wd / val.ht === wow) || SIZES[2];
    // size.ht = size.ht * 2;
    // size.wd = size.wd * 2;
    return size;
}


export function GallerySection({ data }: { data: VendorDetailsBQuery; }) {

    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setIndex] = useState(0);
    const [images, setImages] = useState(data.vendorDetailsB?.galleryPhoto.map(item => `/p/${item.id}.jpg`) ?? []);
    const [galleryFold, setGalleryFold] = useState(true);


    useEffect(() => {
        if (images.length < 1)
            setImages(data.vendorDetailsB?.galleryPhoto.map(item => `/p/${item.id}.jpg`) ?? []);
        console.log(data.vendorDetailsB.galleryPhoto)
    }, [data]);

    function getPhotos() {
        return data?.vendorDetailsB?.galleryPhoto.map(item => {
            let dd = port(item.ht, item.wd);
            return {
                src: (() => {
                    return buildUrl(item.id, dd.ht, dd.wd, 95);
                })(),
                width: dd.wd,
                height: dd.ht,
            };
        },
        ) || [];
    }

    const imageRenderer = useCallback(
        ({ index, photo, margin }: RenderImageProps) => {
            return (
                <img style={{
                    display: 'block',
                    margin: `${margin}px`,
                    cursor: 'pointer',
                }} src={photo.src} key={index}
                    onClick={() => {
                        setIndex(index);
                        setIsOpen(true);
                    }}
                    width={photo.width}
                    height={photo.height}
                    // width={photo.height <= 500 ? photo.width : photo.width * 500 / photo.height}
                    // height={photo.height <= 500 ? photo.height : 500} 
                    />
            );
        }, [],
    );

    return (
        <div>
            <div className={'container text-center'}>
                <div className={'row'} style={{
                    maxHeight: galleryFold ? isMobile ? '500px' : '700px' : '20000px',
                    overflow: 'hidden',
                    position: 'relative',
                    transition: `max-height ${isMobile ? 0.6 : 0.3}s ease`,
                }}>
                    {/*<div className={'row'}>*/}
                    <div className="col-md-12 col-sm-12" style={{
                        paddingRight: isMobile ? '5px' : null,
                        paddingLeft: isMobile ? '5px' : null,
                    }}>
                        <Gallery
                            renderImage={imageRenderer}
                            columns={6}
                            targetRowHeight={400}
                            direction="row"
                            photos={getPhotos()} />
                    </div>
                    {/*</div>*/}
                    {
                        galleryFold &&
                        <div style={{
                            position: 'absolute',
                            zIndex: 18,
                            left: 0,
                            right: 0,
                            bottom: '-23px',
                            height: '100px',
                            pointerEvents: 'none',
                            backgroundImage: 'linear-gradient(hsla(0,0%,98.8%,0),#fff 90%)',
                        }}></div>
                    }
                </div>
                <button type={'button'} className={'v2-button secondary-button'} style={{ marginTop: '35px' }}
                    onClick={() => {
                        if (!galleryFold) {
                            // window.scrollTo(0,0+100)
                            window.scrollTo({ top: 150, behavior: 'smooth' });
                        }
                        setGalleryFold(!galleryFold);
                    }}>{galleryFold ? 'View Full Gallery' : 'See Less'}</button>
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
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
