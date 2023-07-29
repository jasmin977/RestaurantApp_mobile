import React from 'react';
import { View } from 'react-native';
import { Box, RNButton, RNIcon, RNText } from '../../../../components/themed';
import { FilterIcon, SearchIcon } from '../../../../assets';

import { Carousel } from '../../../../components/layout';
import { RootNavigationProps } from '../../../../navigators/ROUTES';
import { Restaurant } from '../../../../entities';
import FoodCategories from './CategoriesList';

import { useAuth } from '../../../../context';
import { scale } from '../../../../helpers';

interface ListHeaderComponentProps {
  rootNavigation: RootNavigationProps['navigation'];
  restaurantData: Restaurant[];
}
const ListHeaderComponent = ({ rootNavigation, restaurantData }: ListHeaderComponentProps) => {
  const { user } = useAuth();
  return (
    <View>
      <Box alignItems="flex-start" spacing={{ py: 10, px: 20, pt: 30 }}>
        <RNText variant="body" style={{ fontSize: scale(18) }}>
          Hi {user?.username}
        </RNText>
        <RNText color="onBackground" variant="h4">
          Discover{' '}
          <RNText color="onBackground" variant="subtitle">
            and
          </RNText>{' '}
          Review{' '}
          <RNText color="onBackground" variant="subtitle">
            the
          </RNText>{' '}
          Best Restaurants{' '}
          <RNText color="onBackground" variant="subtitle">
            Around You!
          </RNText>
        </RNText>
      </Box>
      <Box bg="background" direction="horizontal" spacing={{ px: 20, py: 10 }} gap={10}>
        <Box
          flex={1}
          bg="card"
          h={'100%'}
          justifyContent="flex-start"
          spacing={{ px: 10 }}
          rounded={8}
          direction="horizontal"
          gap={5}
          onPress={() => rootNavigation.navigate('Search')}
        >
          <RNIcon outline as={<SearchIcon />} color="primary" />
          <RNText>search for restaurants</RNText>
        </Box>
        <RNButton
          size="sm"
          centerIcon={<RNIcon as={<FilterIcon />} outline={true} color="white" />}
          onPress={() => console.log('filter button pressed')}
        />
      </Box>
      <FoodCategories />
      <Carousel data={restaurantData} />
    </View>
  );
};

export default ListHeaderComponent;
