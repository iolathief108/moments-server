import {PropsWithChildren} from 'react';
import {commonState} from '../../state';
import Link from 'next/link';


export function LinkWrap(props: PropsWithChildren<{link: string}>) {
    const [isMobile] = commonState.useGlobalState('isMobile');
    const [isMobileWidth] = commonState.useGlobalState('isMobileWidth');

    if (!isMobileWidth && isMobile === undefined) {
        return null;
    }
    if (isMobileWidth || isMobile) {
        return (
            <Link href={props.link}>
                {props.children}
            </Link>
        );
    }
    return (<>{props.children}</>);
}
