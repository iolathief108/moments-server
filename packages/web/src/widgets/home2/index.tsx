import {Hero} from './sections/hero';
import {Search} from './sections/search';
import {Explore} from './sections/explore';
import {Vendor} from './sections/vendor';
import {Qas} from './sections/qas';
import {VendorCat} from './sections/vendor-cat';


export function Home2() {
    return (
        <>
            <Hero/>
            <Search/>
            <Explore/>
            <VendorCat/>
            <Qas/>
            <Vendor/>
        </>
    )
}
