import { BackgoundContainer } from '../../components/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../../navigators/stacks';
import { RNText } from '../../components/themed';

type Props = NativeStackScreenProps<RestaurantStackParamList, 'RestaurantComments'>;
const RestaurantCommentScreen = ({ route, navigation }: Props) => {
  return (
    <BackgoundContainer>
      <RNText>Comments</RNText>
    </BackgoundContainer>
  );
};

export default RestaurantCommentScreen;
