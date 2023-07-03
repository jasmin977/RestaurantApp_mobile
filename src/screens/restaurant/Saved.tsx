import { FunctionComponent } from 'react';
import { BackgoundContainer, CenteredView } from '../../components/common';
import { RNText } from '../../components/themed';

interface SavedRestaurantsProps {}

const SavedRestaurants: FunctionComponent<SavedRestaurantsProps> = () => {
  return (
    <BackgoundContainer>
      <CenteredView>
        <RNText color="onBackground" variant="h4">
          SAVED RESTAURANTS
        </RNText>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default SavedRestaurants;
