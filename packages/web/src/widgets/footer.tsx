import Link from 'next/link';
import {getCategoryUrl} from '../utils/other';
import {VendorType} from '../http/generated';
import {businessName} from '@mara/shared';


export function Footer() {
    return (
        <div>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                            <div className="footer-widget">
                                <a href="#"><img src="/images/logo.png" alt="" className="mb20"/></a>
                                <p className="mb10">Directory listing website for wedding vendors.</p>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12">
                            <div className="footer-widget">
                                <h3 className="widget-title">
                                    Popular Categories
                                </h3>
                                <ul className="listnone">
                                    <li><Link href={getCategoryUrl(VendorType.Venue)}><a>Venues</a></Link></li>
                                    <li><Link href={getCategoryUrl(VendorType.Caterer)}><a>Caterers</a></Link></li>
                                    <li><Link href={getCategoryUrl(VendorType.Photographer)}><a>Photographers</a></Link>
                                    </li>
                                    <li><Link href={getCategoryUrl(VendorType.Florist)}><a>Florists</a></Link></li>
                                    <li><Link
                                        href={getCategoryUrl(VendorType.BeautyProfessional)}><a>Beauticians</a></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-12">
                            <div className="footer-widget">
                                <h3 className="widget-title">
                                    Quick Links
                                </h3>
                                <ul className="listnone">
                                    {/*<li><Link href={'/dev'}><a>About us</a></Link></li>*/}
                                    <li><Link href={'/contact-us'}><a>Contact us</a></Link></li>
                                    <li><Link href={'/dev'}><a>FAQs</a></Link></li>
                                    {/*<li><Link href={'/dev'}><a>Pricing Plan</a></Link></li>*/}
                                    {/*<li><Link href={'/dev'}><a>Advertise with us</a></Link></li>*/}
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-6 col-12">
                            <div className="footer-widget">
                                <h3 className="widget-title">
                                    List you Business
                                </h3>
                                <p>Are you vendor ? List your venue and service get more from listing business.</p>
                                {/*<a style={{marginRight: '20px'}} href="/dev" target='_blank' className="btn btn-default">List your Business</a>*/}
                                <a href="/dash" target='_blank' className="btn btn-secondary">Dash Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tiny-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-right">
                            <p>©2021 {businessName}. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
