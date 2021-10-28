import {useRouter} from 'next/router';
import sdk from '../../../http/sdk';
import {VendorIntro} from '../../../widgets/store-front/common/vendor-intro';
import {Faqs} from '../../../widgets/store-front/common/faqs';
import {OverviewSection} from '../../../widgets/store-front/common/overview-section';
import {GallerySection} from '../../../widgets/store-front/common/gallery-section';
import {ContactBottom} from '../../../widgets/store-front/common/contact-bottom';
import {ContactPopup} from '../../../widgets/store-front/common/contact-popup';
import {contactPopupState} from '../../../state';
import {VendorDetailsBQuery} from '../../../http/generated';
import Link from 'next/link';
import {getCategoryUrl, getVendorTypeInfo} from '../../../utils/other';
import SppView from '../../../widgets/spp';
import {isMobile} from 'react-device-detect';


type Props = {
    data: VendorDetailsBQuery
}

function Breadcrumb(
    props: Props
) {
    return (
        <div>
            <div className={'container'}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{
                        backgroundColor: 'transparent',
                        paddingLeft: 0,
                    }}>
                        <li className="breadcrumb-item">
                            <Link href={'/search'}>
                                <a>Wedding Vendors</a>
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href={props.data.vendorDetailsB?.vendor_type ? getCategoryUrl(props.data.vendorDetailsB?.vendor_type) : '/search'}>
                                <a>{getVendorTypeInfo(props.data.vendorDetailsB?.vendor_type)?.displayName}</a>
                            </Link>
                        </li>
                        {
                            <li className="breadcrumb-item active" aria-current="page">{props.data.vendorDetailsB?.business_name}</li>
                        }
                    </ol>
                </nav>
            </div>
        </div>
    );
}

export default function WeddingVendor() {

    const router = useRouter();
    const [popupActive] = contactPopupState.useGlobalState('contactPopupActive');
    const name = router.query.name as any;
    const vid = router.query.vid as any;
    
    console.log(router.query)

    const {data} = sdk.useVendorDetailsB({
        businessName: name || '',
        vid: vid || null,
    });

    if (!data?.vendorDetailsB) {
        return <div>Oh dear, this link isn&apos;t working.</div>;
    }

    return (
        <>
            {
                !isMobile &&
                <Breadcrumb data={data}/>
            }
            <OverviewSection data={data}/>
            <GallerySection data={data}/>
            {popupActive ? <ContactPopup data={data}/> : null}
            <VendorIntro data={data}/>
            <Faqs data={data}/>
            <SppView data={data}/>
            <ContactBottom data={data}/>
        </>
    );
}

WeddingVendor.getInitialProps = async (ctx) => {
    return { stars: '' }
}
