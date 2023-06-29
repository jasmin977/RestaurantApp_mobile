import { FunctionComponent } from 'react';
import { styled } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { ScreenWidth } from '../containers/Backgound';
import { Restaurant } from '../../../entities';
import { RestaurantNavigationProps } from '../../../navigators/stacks/Restaurants';
import Review from '../review/Review';
import { RNText } from '../../themed';
import { useTheme } from '../../../hooks';

const StyledView = styled.View`
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 15px;
`;

const RestaurantItem: FunctionComponent<Restaurant> = ({
  name,
  location,
  img,
  description,
  workingTime,
  rating,
  id,
  menu,
}) => {
  const navigation = useNavigation<RestaurantNavigationProps>();

  const restaurantObject: Restaurant = {
    id: id,
    name: name,
    location: location,
    img: img,
    rating: rating,
    description: description,
    workingTime: workingTime,
    menu: menu,
  };
  const { theme } = useTheme();
  const StyledCard = styled.TouchableOpacity`
    width: ${ScreenWidth * 0.8}px;
    background-color: ${theme.colors.card};
    border-radius: 15px;
    margin-right: 20px;
    overflow: hidden;
    padding: 10px;
  `;

  return (
    <StyledCard
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate('RestaurantProfile', {
          restoData: restaurantObject,
        });
      }}
    >
      <StyledView>
        <RNText variant="h5" color="onSurface" spacing={{ mt: 5 }}>
          {name}
        </RNText>
        <Review rating={rating} />
        <StyledImage resizeMode="contain" source={img} />
      </StyledView>
    </StyledCard>
  );
};

export default RestaurantItem;
