import {commonState} from '../../../state';
import Link from 'next/link';
import {PropsWithChildren} from 'react';
import {LinkWrap} from '../../common/LinkWrap';


type ThingProps = {
    link: string
    url: string
    text: string
};


function Thing(props: ThingProps) {
    const [isMobile] = commonState.useGlobalState('isMobile');

    const Do = () => {
        return (
            <a target={isMobile ? null : '_blank'} href={props.link} className={'col-sm-4 col-lg-3 pb-md-4'}
               style={{cursor: 'pointer', marginBottom: '10px'}}>
                <div className={'row text-sm-center'}>
                <span className={'col-3 col-sm-12 d-flex justify-content-center pb-sm-2'}>
                    <div className={'mr-1'}
                         style={{width: '50px', borderRadius: '40px', padding: '4px', backgroundColor: '#6661'}}><img
                        width={'100%'} src={props.url}/></div>
                </span>
                    <span className={'col-9 col-sm-12 font-weight-normal'}
                          style={{fontFamily: 'roboto, sans-serif', color: '#444', alignSelf: 'center'}}>
                    {props.text}
                        {/*<span className={''} style={{}}>{props.text}</span>*/}
                        <i className={'fa fa-arrow-right ml-1'} style={{fontSize: '14px', paddingBottom: '7px'}}/>
                </span>
                </div>
            </a>
        );
    };

    return (
        <LinkWrap link={props.link}>
            <Do/>
        </LinkWrap>
    )
    // if (isMobile === undefined)
    //     return null;
    //
    // if (isMobile) {
    //     return (
    //         <Link href={props.link}>
    //             <Do/>
    //         </Link>
    //     );
    // }
    // return <Do/>;

}

export function VendorCat() {
    return (
        <div className={''} style={{
            backgroundColor: '#ecf7f9',
            paddingBottom: '50px',
            paddingTop: '45px',
        }}>
            <div className={'container'}>
                <div className="row">
                    <h4 className={'col-sm-5 col-lg-4 serif pb-4 pt-md-2 text-center text-sm-left'}>Browse Pre-Screened
                        Vendors by Category</h4>
                    <div className={'col-sm-7 col-lg-8'} style={{paddingLeft: '29px'}}>
                        <div className="row">
                            <Thing link={'/search/wedding-venues'} text={'Venue'}
                                   url={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/agnostic_venue.5d386156.svg'}/>
                            <Thing link={'/search/wedding-photographers'} text={'Photographer'}
                                   url={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/camera.ed2453b0.svg'}/>
                            <Thing link={'/search/wedding-videographers'} text={'Videographer'}
                                   url={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/video.a10c29da.svg'}/>
                            <Thing link={'/search/wedding-florists'} text={'Florist'}
                                   url={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/bouquet.042d7ec1.svg'}/>
                            <Thing link={'/search/wedding-bands-djs'} text={'Bands & DJs'}
                                   url={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/bands_dj.3ef941c6.svg'}/>
                            <Thing link={'/search/wedding-beauty-professionals'} text={'Beauty Professionals'}
                                   url={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/hair_makeup.4a45a7cd.svg'}/>
                            <Thing link={'/search/wedding-caterer'} text={'Caterers'}
                                   url={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/mixer.e1323459.svg'}/>
                            <Thing link={'/search/wedding-cakes-desserts'} text={'Cakes & Desserts'}
                                   url={'https://d1tntvpcrzvon2.cloudfront.net/vmassets/static/media/wedding_cake.72922602.svg'}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
