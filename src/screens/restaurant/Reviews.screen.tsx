import { Image } from 'react-native';
import { BackButton, BackgoundContainer } from '../../components/common';
import { Box, RNText } from '../../components/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../../navigators/stacks';
import { AVATAR } from '../../assets';

import { styled } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { RootBottomStackParamList } from '../../navigators/stacks/BotoomTab';

type Props = NativeStackScreenProps<RestaurantStackParamList, 'RestaurantReviews'>;

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

type NavigationProps = NativeStackScreenProps<RootBottomStackParamList>;
const RestaurantReviewsScreen = ({ route, navigation }: Props) => {
  const usenavigation = useNavigation<NavigationProps['navigation']>();

  return (
    <BackgoundContainer>
      <StyledScrollView stickyHeaderIndices={[0]}>
        <Box
          bg="background"
          direction="horizontal"
          spacing={{ px: 20, py: 5 }}
          gap={10}
          justifyContent="space-between"
          //  style={{ position: 'absolute', top: 40 }}
        >
          <BackButton onPress={() => navigation.goBack()} />
          <RNText variant="subtitle">Ratings&Reviews</RNText>
          <Box></Box>
        </Box>

        {/** comment & review */}
        <Box
          direction="horizontal"
          spacing={{ mx: 10, mr: 20, mb: 25, mt: 10 }}
          gap={10}
          // onPress={() => navigation.navigate('AddReview')}
        >
          <Box
            bg="card"
            spacing={{ p: 10 }}
            style={{
              borderTopEndRadius: 50,
              borderTopStartRadius: 50,
              borderBottomLeftRadius: 50,
              transform: [{ rotate: '45deg' }],
            }}
          >
            <Image
              source={AVATAR}
              resizeMode="contain"
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                transform: [{ rotate: '-45deg' }],
              }}
            />
          </Box>
          <Box alignItems="flex-start" flex={1} bg="card" spacing={{ p: 20 }} rounded={8}>
            <RNText variant="caption">give us your feedback</RNText>
          </Box>
        </Box>

        <Box h={100}></Box>
      </StyledScrollView>
    </BackgoundContainer>
  );
};

export default RestaurantReviewsScreen;
