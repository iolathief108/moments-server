import {Home2} from '../widgets/home2';
import {isServer} from '../utils/pageUtils';

export default function Home() {
    if (typeof window === 'undefined' || isServer()) return null
    return <Home2/>
}

Home.getInitialProps = async () => {
    return { stars: '' }
}
