import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import MetisMenu from 'metismenujs';
import SimpleBar from 'simplebar-react';
import {VendorType} from '@mara/shared';
import {useGlobalState} from '../../state';
import {paths} from '../../routes';


const Li = ({name, to, iconCln, effectCln}: any) => {
    return (
        <li>
            <Link to={to || paths.dashboard()} className={'waves-effect'}>
                <i className={iconCln ?? 'ti-calendar'}/>
                <span>{name}</span>
            </Link>
        </li>
    );
};

const build = (cat: VendorType | null) => {
    const nocat = [
        <Li key={2} to={paths.profile()} name={'Profile'} iconCln={'ti-user'}/>,
        <Li key={3} to={paths.init()} name={'Init'} iconCln={'ti-check-box'}/>,
        // <Li key={1} to={paths.dashboard()} name={'Dashboard'}/>,
    ];
    const common = [
        // <Li key={1} to={paths.dashboard()} name={'Dashboard'}/>,
        <Li key={3} to={paths.profile()} name={'Profile'} iconCln={'ti-user'}/>,
        <Li key={5} to={paths.yan()} name={'Listing'} iconCln={'ti-check-box'}/>,
        <Li key={4} to={paths.gallery()} name={'Gallery'} iconCln={'ti-image'}/>,
        // <Li key={2} to={paths.editContact()} name={'Contacts'}/>,
        // <Li key={6} to={paths.location()} name={'Location'} iconCln={'ti-calendar'}/>,
    ];
    const caterer = [...common];
    const photographer = [...common];
    const venue = [...common];
    const florist = [...common];
    const beautyProfessional = [...common];
    const musician= [...common];
    const baker = [...common];
    const videographer = [...common];

    if (cat === VendorType.Caterer) {
        return caterer;
    }
    if (cat === VendorType.Venue) {
        return venue;
    }
    if (cat === VendorType.Photographer) {
        return photographer;
    }
    if (cat === VendorType.Florist) {
        return florist
    }
    if (cat === VendorType.BeautyProfessional) {
        return beautyProfessional
    }
    if (cat === VendorType.BandsDj) {
        return musician;
    }
    if (cat === VendorType.CakesDessert) {
        return baker;
    }
    if (cat === VendorType.Videographer) {
        return videographer
    }
    return nocat;
};

const SidebarContent = () => {
    const [cat] = useGlobalState('category');

    return (
        <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
                {
                    build(cat)
                }
            </ul>
        </div>
    );
};

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.initMenu();
    }

    componentDidUpdate(prevProps) {
        // @ts-ignore
        if (this.props.type !== prevProps.type) {
            this.initMenu();
        }
    }

    initMenu() {
        // @ts-ignore
        if (this.props.type !== 'condensed' || this.props.isMobile) {
            new MetisMenu('#side-menu');

            let matchingMenuItem = null;
            const ul = document.getElementById('side-menu');
            const items = ul.getElementsByTagName('a');
            for (let i = 0; i < items.length; ++i) {
                // @ts-ignore
                if (('/dash' + this.props.location.pathname) === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }
            if (matchingMenuItem) {
                this.activateParentDropdown(matchingMenuItem);
            }
        }
    }

    activateParentDropdown = item => {
        item.classList.add('mm-active');
        const parent = item.parentElement;

        if (parent) {
            parent.classList.add('mm-active'); // li
            const parent2 = parent.parentElement;

            if (parent2) {
                parent2.classList.add('mm-show');

                const parent3 = parent2.parentElement;

                if (parent3) {
                    parent3.classList.add('mm-active'); // li
                    parent3.childNodes[0].classList.add('mm-active'); //a
                    const parent4 = parent3.parentElement;
                    if (parent4) {
                        parent4.classList.add('mm-active');
                    }
                }
            }
            return false;
        }
        return false;
    };

    render() {
        return (
            <React.Fragment>
                {/*@ts-ignore*/}
                {this.props.type !== 'condensed' ? (
                    <SimpleBar style={{maxHeight: '100%'}}>
                        <SidebarContent/>
                    </SimpleBar>
                ) : (
                    <SidebarContent/>
                )}
            </React.Fragment>
        );
    }
}

// @ts-ignore
export default withRouter(Sidebar);
