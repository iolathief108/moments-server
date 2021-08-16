import Link from 'next/link';
import {getCategoryUrl, localVendorTypes} from '../utils/other';
import {VendorType} from '../http/generated';


export function Header() {

    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <nav className="navbar navbar-expand-lg navbar-classic">
                            <Link href="/">
                                <a className="navbar-brand"> <img src="/images/logo.png" alt=""/></a>
                            </Link>
                            <button className={'navbar-toggler collapsed'} data-toggle="collapse"
                                    data-target="#navbar-classic" aria-controls="navbar-classic" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="icon-bar top-bar mt-0"/>
                                <span className="icon-bar middle-bar"/>
                                <span className="icon-bar bottom-bar"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbar-classic">
                                <ul className="navbar-nav ml-auto mt-2 mt-lg-0 mr-3">
                                    <li className="nav-item">
                                        <Link href={'/'}>
                                            <a className="nav-link" id="menu-1">
                                                Home
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href={'/search/'}>
                                            <a className="nav-link" id="menu-2">
                                                Find
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link href={'/search/'}>
                                            <a className="nav-link dropdown-toggle" id="menu-3"
                                               data-toggle="dropdown"
                                               aria-haspopup="true" aria-expanded="false">
                                                Suppliers
                                            </a>
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="menu-3">
                                            {
                                                localVendorTypes.map(i => (
                                                    <li key={i.key}>
                                                        <Link href={`/search/${i.slug}`}>
                                                            <a className="dropdown-item"
                                                               title="">{i.displayName}</a>
                                                        </Link>
                                                    </li>
                                                ))
                                            }
                                            {/*<li>*/}
                                            {/*    <Link href={getCategoryUrl(VendorType.Venue)}>*/}
                                            {/*        <a className="dropdown-item"*/}
                                            {/*           title="">Venues</a>*/}
                                            {/*    </Link>*/}
                                            {/*</li>*/}
                                            {/*<li>*/}
                                            {/*    <Link href={getCategoryUrl(VendorType.Photographer)}>*/}
                                            {/*        <a className="dropdown-item"*/}
                                            {/*           title="">Photographers</a>*/}
                                            {/*    </Link>*/}
                                            {/*</li>*/}
                                            {/*<li>*/}
                                            {/*    <Link href={getCategoryUrl(VendorType.Caterer)}>*/}
                                            {/*        <a className="dropdown-item"*/}
                                            {/*           title="">Caterers</a>*/}
                                            {/*    </Link>*/}
                                            {/*</li>*/}
                                        </ul>
                                    </li>
                                </ul>
                                {/*<Link href={'/'}>*/}
                                    <a href='/dash' target='_blank' className="btn btn-default btn-sm">Become a Vendor</a>
                                {/*</Link>*/}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
