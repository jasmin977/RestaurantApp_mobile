import { lazy } from 'react';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const LazyMenuSection = lazy(() => delay(5000).then(() => import('./sections/MenuSection')));
export const LazyReviwSection = lazy(() =>
  delay(5000).then(() => import('./sections/RestaurantRatingAndReviews'))
);
export const LocationMap = lazy(() => delay(5000).then(() => import('./sections/LocationMap')));
