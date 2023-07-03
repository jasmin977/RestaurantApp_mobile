import { styled } from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { BackIcon } from '../../assets';

import { BackgoundContainer } from '../../components/common';
import { RestaurantDetails } from '../../components/layout';
import { useTheme } from '../../hooks';
import { RNButton, RNIcon } from '../../components/themed';
import { RootBottomStackParamList } from '../../navigators/RootStack';

interface RestaurantProfileScreenProps {}

type Props = NativeStackScreenProps<RootBottomStackParamList, 'RestaurantProfile'>;

const RestaurantProfileScreen = ({ route, navigation }: Props) => {
  const restaurantObject = route.params.restoData;
  const { theme } = useTheme();
  const RestaurantImage = styled.Image`
    width: 100%;
    height: 300px;
  `;

  const StyledScrollView = styled.ScrollView`
    background-color: ${theme.colors.background};
    flex: 1;
  `;

  return (
    <StyledScrollView>
      <BackgoundContainer>
        <RNButton
          size="sm"
          style={{
            position: 'absolute',
            top: 40,
            left: 20,
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
          onPress={() => navigation.goBack()}
          centerIcon={
            <RNIcon outline={true} color="white">
              <BackIcon />
            </RNIcon>
          }
        />

        <RestaurantImage resizeMode="cover" source={restaurantObject.img} />
        <RestaurantDetails {...restaurantObject} />
      </BackgoundContainer>
    </StyledScrollView>
  );
};

export default RestaurantProfileScreen;
