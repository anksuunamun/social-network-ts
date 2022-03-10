import React, { ComponentType, Suspense } from 'react';

import Preloader from '../../Components/Common/Preloader/Preloader';

export function withSuspense<T>(Component: ComponentType<T>) {
  return function ComponentWithSuspense(props: T) {
    return (
      <Suspense fallback={<Preloader />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
