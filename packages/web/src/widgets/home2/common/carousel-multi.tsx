import Slider, {Settings} from 'react-slick';
import {commonState} from '../../../state';
import {LinkWrap} from '../../common/LinkWrap';

type ItemProps = {
    img: string
    name: string
    link: string
}
const Item = ({img, name, link}: ItemProps) => {
    const [isMobile] = commonState.useGlobalState('isMobile')
    if (isMobile === undefined) return null
    return (
        <LinkWrap link={link}>
        <a style={{
            width: isMobile ? '240px' : null
        }} target={!isMobile && '_blank'} href={link}>
            <div className={'pl-2 pr-2 pt-2 pb-2'} style={{cursor: 'pointer', display: 'inline-block'}}>
                <div className={'helldd'} style={{
                    boxShadow: '1px 2px 6px 0px #00000029 !important',
                    borderRadius:'5px',
                    backgroundColor: '#fff'
                }}>
                    <div style={{
                        borderRadius: '5px',
                        overflow: 'hidden',
                        cursor: 'pointer'
                    }}>
                        <img height={'290px'} style={{
                            objectFit: 'cover'
                        }} width={'240px'} src={img}/>
                        <div style={{
                            paddingLeft: '13px',
                            paddingTop: '3px',
                            paddingBottom: '3px'
                        }}>
                            <p className={'text-capitalize font-weight-bold'}><i style={{paddingRight: '3px'}} className={'fa fa-map-marker-alt'}/> {name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </a></LinkWrap>
    );
};

type CarouselProps = {
    urls: {
        url: string
        name: string
        link: string
    }[]
}
export function CarouselMulti(props: CarouselProps) {
    const [isMobileWidth] = commonState.useGlobalState('isMobileWidth')
    const [isMobile] = commonState.useGlobalState('isMobile')
    const settings:Settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        arrows: true,
        initialSlide: 0,
        swipeToSlide: true,
        variableWidth: true,
        // edgeFriction:2,//remove
        // touchMove:true,//remove
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    // slidesToShow: 3,
                    // slidesToScroll: 3,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    // slidesToShow: 2,
                    // slidesToScroll: 2,
                    // initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    // slidesToShow: 1,
                    // slidesToScroll: 1
                }
            }
        ]
    };

    if (typeof window === 'undefined' || isMobileWidth ===undefined || isMobile === undefined) return null

    if (isMobileWidth && isMobile) {
        return (
            <div style={{
                overflowX: 'scroll',
                maxWidth: '1000%'
            }}>
                <div style={{
                    display: 'inline-flex'
                }}>
                    {
                        props.urls.map((value, index)=> <Item key={index} link={value.link} img={value.url} name={value.name}/>)
                    }
                </div>
            </div>
        )
    }

    return (
        <div style={{
            width: '100%'
        }}>
            <Slider {...settings}>
                {
                    props.urls.map((value, index)=> <Item key={index} link={value.link} img={value.url} name={value.name}/>)
                }
            </Slider>
        </div>
    );
}

