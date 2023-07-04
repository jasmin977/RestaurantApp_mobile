import { FunctionComponent } from 'react';
import { styled } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWidth } from '../containers/Backgound';
import { Restaurant } from '../../../entities';
import Review from '../review/Review';
import { RNText } from '../../themed';
import { useTheme } from '../../../hooks';
import { HomeNavigationProps } from '../../../navigators/stacks/Home';

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
  const navigation = useNavigation<HomeNavigationProps['navigation']>();

  const { theme } = useTheme();
  const StyledCard = styled.TouchableOpacity`
    width: ${ScreenWidth * 0.7}px;
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
        navigation.navigate('RestaurantStack', {
          screen: 'RestaurantProfile',
          params: {
            id: id,
          },
        });
      }}
    >
      <StyledView>
        <RNText variant="subtitle" color="onCard" spacing={{ mt: 5 }}>
          {name}
        </RNText>
        <Review rating={rating} />
        <StyledImage resizeMode="contain" source={img} />
      </StyledView>
    </StyledCard>
  );
};

export default RestaurantItem;
