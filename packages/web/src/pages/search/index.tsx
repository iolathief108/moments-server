import {SearchInput} from '../../widgets/search/search-input';
import {SearchResult} from '../../widgets/search/search-result';
import 'react-select-search/style.css';

export default function Search() {
    return (
        <div>
            <SearchInput/>
            <SearchResult/>
        </div>
    )
}

Search.getInitialProps = async (ctx) => {
    console.log('initial props')
    return { stars: '' }
}
