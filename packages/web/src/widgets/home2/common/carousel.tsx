import Slider, {Settings} from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {commonState} from '../../../state';


type ItemProps = {
    url: string
}
const Item = ({url}: ItemProps) => {
    const [isMobile] = commonState.useGlobalState('isMobile');
    return (
        <div style={{
            width: '100%',
        }}>
            {
                isMobile ?
                    <img className={'h-25'} width={'100%'}
                         style={{objectFit: 'cover', minHeight: '310px', maxHeight: '500px'}} src={url}/> :
                    <img style={{
                        maxHeight: '600px',
                        width: '100%',
                        objectFit: 'cover',
                    }} src={url}/>
            }
        </div>
    );
};


type CarouselProps = {
    urls: string[]
}

export function Carousel(props: CarouselProps) {
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 5000,
    };
    return (
        <div style={{
            width: '100%',
        }}>
            <Slider {...settings}>
                {
                    props.urls.map((value, index) => <Item key={index} url={value}/>)
                }
            </Slider>
        </div>
    );
}

type CarouselFull = {
    content: any[]
}

export function CarouselFull(props: CarouselFull) {
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 5000,
    };
    return (
        <div style={{
            width: '100%',
        }}>
            <Slider {...settings}>
                {
                    props.content.map((value, index) => (
                        <div key={index} style={{width: '100%'}}>
                            {value}
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
}
