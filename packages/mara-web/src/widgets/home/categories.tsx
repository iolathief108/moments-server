import Link from 'next/link';
import {getCategoryUrl} from '../../utils/other';
import {VendorType} from '../../http/generated';


export function Categories() {

    return (
        <div className="space-small bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="section-title">
                            <h2 className="mb10">Most Popular Categories</h2>
                            <p>Browse our most popular category and vendor or supplier listing.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="vendor-categories">
                            <div className="vendor-category-image">

                                <Link href={getCategoryUrl(VendorType.Venue)}>
                                    <a><img src="images/vendor-category-image.jpg" alt=""/></a>
                                </Link>

                                <div className="vendor-thumbnail-icon-circle"><i className="flaticon-025-wedding-cake"/>
                                </div>
                            </div>
                            <div className="vendor-categories-content">
                                <h3 className="vendor-categories-heading">
                                    <Link href={getCategoryUrl(VendorType.Venue)}>
                                        <a className="vendor-categories-name"> Venues</a>
                                    </Link>
                                </h3>
                                <span className="vendor-categories-count">12</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="vendor-categories">
                            <div className="vendor-category-image">
                                <Link href={getCategoryUrl(VendorType.Photographer)}>
                                    <a><img src="images/vendor-category-image-3.jpg" alt=""/></a>
                                </Link>
                                <div className="vendor-thumbnail-icon-circle"><i className="flaticon-038-camera"/>
                                </div>
                            </div>
                            <div className="vendor-categories-content">
                                <h3 className="vendor-categories-heading">
                                    <Link href={getCategoryUrl(VendorType.Photographer)}>
                                        <a href="#" className="vendor-categories-name">Photographers</a>
                                    </Link>
                                </h3>
                                <span className="vendor-categories-count">11</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                        <div className="vendor-categories">
                            <div className="vendor-category-image">
                                <Link href={getCategoryUrl(VendorType.Caterer)}>
                                    <a><img src="images/vendor-category-image-4.jpg" alt=""/></a>
                                </Link>
                                <div className="vendor-thumbnail-icon-circle"><i className="flaticon-033-bouquet"/>
                                </div>
                            </div>
                            <div className="vendor-categories-content">
                                <h3 className="vendor-categories-heading">
                                    <Link href={getCategoryUrl(VendorType.Caterer)}>
                                        <a href="#" className="vendor-categories-name">Caterers</a>
                                    </Link>
                                </h3>
                                <span className="vendor-categories-count">32</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
