import {VendorType} from '../../http/generated';
import {getVendorTypeInfo} from '../../utils/other';
import Link from 'next/link';


type Props = {
    photoUrl: string
    vType: VendorType
    businessName: string
    districtDisplayName: string
    vid: string
};

function buildUrl(str: string) {
    return `/p/${str}_500q95.webp`;
}

function getProductLink(bName: string, vType: VendorType, vid?: string) {
    return `/wedding-vendors/${getVendorTypeInfo(vType)?.slug}/${bName}/?vid=${vid ?? ''}`;
}

export function VendorCard(props: Props) {
    return (
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">
            <div className="vendor-thumbnail">
                <div className="vendor-img zoomimg">
                    <Link href={getProductLink(props.businessName, props.vType, props.vid)}>
                        <a><img src={buildUrl(props.photoUrl)} className="img-fluid"/></a>
                    </Link>
                </div>
                <div className="vendor-content">
                    <p className="vendor-address">{getVendorTypeInfo(props.vType)?.displayName}</p>
                    <h2 className="vendor-title">
                        <Link href={getProductLink(props.businessName, props.vType, props.vid)}>
                            <a className="title">{props.businessName}</a>
                        </Link>
                    </h2>
                    <p className="vendor-address">{props.districtDisplayName}</p>
                </div>
            </div>
        </div>


    );
}