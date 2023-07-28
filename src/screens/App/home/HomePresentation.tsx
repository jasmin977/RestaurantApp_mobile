import React from 'react';

import HomeLayout from '../../../components/layout/HomeLayout';

import HeaderComponent from './../home/components/HeaderComp';
import { Restaurant, Review } from '../../../entities';
import { RootNavigationProps } from '../../../navigators/ROUTES';
import ListHeaderComponent from './components/ListHeaderComp';
import ReviewCard from './components/ReviewCard';

interface HomePresentationProps {
  reviewData: Review[];
  restaurantData: Restaurant[];
  rootNavigation: RootNavigationProps['navigation'];
}

const HomePresentation = ({
  reviewData,
  restaurantData,
  rootNavigation,
}: HomePresentationProps) => {
  const renderItem = (item: Review) => {
    return <ReviewCard key={`key_${item._id}_ `} {...item} />;
  };

  return (
    <HomeLayout
      data={reviewData}
      headerHeight={30}
      renderItem={renderItem}
      ListHeaderComponent={
        <ListHeaderComponent rootNavigation={rootNavigation} restaurantData={restaurantData} />
      }
      HeaderComponent={<HeaderComponent rootNavigation={rootNavigation} />}
    />
  );
};

export default HomePresentation;
