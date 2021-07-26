import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';
import sdk from '../../http/sdk';
import {VendorType} from '../../http/generated';
import {getCategoryUrl, getImageUrl, getProductUrl, getVendorTypeInfo} from '../../utils/other';
import Link from 'next/link';
import {searchState} from '../../state';
import {useRouter} from 'next/router';


const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
    ssr: false,
});

type Props = {
    businessName: string
    location: string
    imageUrl: string
    id: string
    vType: VendorType
}

function WeddingList(props: Props) {

    return (
        <div className="item">
            <div className="col-xl-11">
                <div className="vendor-thumbnail-second vendor-thumbnail">
                    <div className="vendor-img overlay-dark">
                        <Link href={getProductUrl(props.businessName, props.vType, props.id)}>
                            <a><img src={getImageUrl(props.imageUrl, 300, 350)} alt="" className="img-fluid"/></a>
                        </Link>
                    </div>
                    <div className="vendor-content">
                            <Link href={getProductUrl(props.businessName, props.vType, props.id)}>
                                <a className="title">
                        <h2 className="vendor-title">
                                    {props.businessName}
                        </h2>
                                </a>
                            </Link>
                        <p className="vendor-address">
                            <span className="vendor-address-icon">
                                <i className="fa fa-map-marker-alt"/>
                            </span> {props.location}.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export function LatestListings() {

    const {data} = sdk.useTopWeddingVendors();
    if (!data) {
        return null;
    }
    return (
        <div className="space-small">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="section-title">
                            <h2 className="mb10">Latest Wedding Listing</h2>
                            <p>Find our latest wedding listing with featured listing from famous city or vendors.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="venue-thumbnail-carousel">
                    <OwlCarousel className="owl-carousel owl-theme owl-venue-thumb" loop margin={0} autoPlay
                                 autoplayTimeout={3000} nav
                                 navText={['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']}
                                 responsive={{
                                     0: {
                                         items: 1,

                                     },
                                     600: {
                                         items: 2,

                                     },
                                     1000: {
                                         items: 4,

                                     },
                                     1200: {
                                         items: 6,

                                     },
                                     1400: {
                                         items: 6,

                                     },
                                     1600: {
                                         items: 6,

                                     },
                                     1800: {
                                         items: 6,

                                     },
                                 }}
                                 width={100}
                    >
                        {
                            data?.vendorSearch.edges.map(item => <WeddingList
                                key={item.node.id}
                                businessName={item.node.business_name}
                                vType={item.node.vendor_type}
                                imageUrl={item.node.gallery_photos[0].id}
                                location={item.node.district_display_name}
                                id={item.node.id}/>)
                        }
                    </OwlCarousel>
                    {/*View All Listing*/}
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                            <Link href={'/search/'}>
                                <a className="btn btn-primary">View All Listing</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
