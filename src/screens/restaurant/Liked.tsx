import { FunctionComponent } from 'react';
import { BackgoundContainer, CenteredView } from '../../components/common';
import { RNText } from '../../components/themed';

interface LikedRestaurantsProps {}

const LikedRestaurants: FunctionComponent<LikedRestaurantsProps> = () => {
  return (
    <BackgoundContainer>
      <CenteredView>
        <RNText color="onBackground" variant="h4">
          Liked RESTAURANTS
        </RNText>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default LikedRestaurants;
