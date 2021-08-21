import {Hero} from '../widgets/home/hero';
import {Categories} from '../widgets/home/categories';
import {LatestListings} from '../widgets/home/latest-listings';

export default function Home() {
    return (
        <div>
            <Hero/>
            <Categories/>
            <LatestListings/>
            {/*<PopularLocations/>*/}
        </div>
    )
}

Home.getInitialProps = async () => {
    return { stars: '' }
}
