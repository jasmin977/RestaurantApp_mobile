import { BackgoundContainer, CenteredView } from '../components/common';
import { RNText } from '../components/themed';
import { RootBottomStackParamList } from '../navigators/RootStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface NotificationsProps {}

type Props = NativeStackScreenProps<RootBottomStackParamList, 'Notifications'>;
const Notifications = () => {
  return (
    <BackgoundContainer>
      <CenteredView>
        <RNText color="onBackground" variant="h4">
          NOTIFICATION
        </RNText>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Notifications;
