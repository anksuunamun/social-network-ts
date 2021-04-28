import {ComponentType, Suspense} from 'react';
import React from 'react';
import Preloader from '../../Components/Common/Preloader/Preloader';

export function withSuspense<T>(Component: ComponentType<T>) {
    return (props: T) => {
        return (<Suspense fallback={<Preloader/>}>
            <Component {...props}/>
        </Suspense>)
    }
}