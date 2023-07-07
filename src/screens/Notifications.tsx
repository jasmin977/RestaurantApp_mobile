import { BackgoundContainer, CenteredView } from '../components/common';
import { ListSection } from '../components/layout';
import { Box, RNText } from '../components/themed';
import { restaurants } from '../data/restaurants';
import { RootBottomStackParamList } from '../navigators/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface NotificationsProps {}

type Props = NativeStackScreenProps<RootBottomStackParamList, 'Notifications'>;
const Notifications = ({ navigation }: Props) => {
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
            NOTIFICATION
          </RNText>
        </Box>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Notifications;
