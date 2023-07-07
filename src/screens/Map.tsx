import { FunctionComponent, useEffect, useRef } from 'react';
import { BackgoundContainer, CenteredView } from '../components/common';
import { Box, RNText } from '../components/themed';
import { ListSection } from '../components/layout';
import { restaurants } from '../data/restaurants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootBottomStackParamList } from '../navigators/RootStack';

interface MapProps {}
type Props = NativeStackScreenProps<RootBottomStackParamList, 'Map'>;
const Map: FunctionComponent<Props> = ({ navigation }) => {
  return (
    <BackgoundContainer>
      <CenteredView>
        <Box
          onPress={() =>
            navigation.navigate('RestaurantStack', {
              screen: 'RestaurantProfile',
              params: {
                id: 1,
              },
            })
          }
        >
          <RNText color="onBackground" variant="h4">
            MZP
          </RNText>
        </Box>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Map;
