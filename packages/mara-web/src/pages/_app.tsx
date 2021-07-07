import type {AppProps} from 'next/app';
import 'normalize.css';
import Head from 'next/head';
import {Header} from '../widgets/header';
import {Footer} from '../widgets/footer';
import '../styles/globals.scss';
import '../styles/override.scss';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="description" content="wedding vendor directory HTML template"/>
                <title>Wedding Vendor &amp; Supplier Directory HTML Template - RealWed </title>
                <link href="/css/bootstrap.min.css" rel="stylesheet"/>
                <link href="/fontawesome/css/fontawesome-all.css" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css?family=Rubik:300,300i,400,400i,500,500i,700,700i,900,900i"
                      rel="stylesheet"/>
                <link href="/fontello/css/fontello.css" rel="stylesheet"/>
                <link rel="stylesheet" type="text/css" href="/wedding-icon-font/flaticon.css"/>
                <script src="/js/jquery.min.js"/>
                {/*<link href="css/owl.carousel.css" type="text/css" rel="stylesheet"/>*/}
                {/*<link href="css/owl.theme.default.css" type="text/css" rel="stylesheet"/>*/}
                <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico"/>
                <link href="/css/style.css" rel="stylesheet"/>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        var $ =  jQuery;
                        window.jQuery = jQuery
                    `
                }}/>
            </Head>

            <Header/>
            <Component {...pageProps} />
            <Footer/>
            <a href="javascript:" id="return-to-top"><i className="fa fa-angle-up"/></a>

            {/*should active imported above*/}
            <script src="/js/return-to-top.js"/>
            <script src="/js/bootstrap.min.js"/>
            <script src="/js/custom-script.js"/>

            {/*<script src="/js/owl.carousel.min.js"/>*/}
            {/*<script src="js/jquery.nice-select.min.js"/>*/}
            {/*<script src="/js/fastclick.js"/>*/}
            {/*<script src="/js/dzsparallaxer.js"/>*/}
        </>
    );
}

export default MyApp;
