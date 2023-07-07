import { FunctionComponent, useEffect, useState } from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity } from 'react-native';
import { BackgoundContainer } from '../../components/common';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../../components/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../../navigators/stacks';
import {
  AVATAR,
  BackIcon,
  peperoniPizza,
  rest_1,
  salad,
  vegeterianPizza,
  vegyBurger,
} from '../../assets';
import CenteredContainer from '../../components/common/containers/Centered';
import { RatingStars, ReviewCard, ReviewForm, StarPercentage } from './components';
import { styled } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { RootBottomStackParamList } from '../../navigators/RootStack';
import RNModal from '../../components/themed/Modal';

type Props = NativeStackScreenProps<RestaurantStackParamList, 'RestaurantReviews'>;

const reviewData = [
  {
    id: 1,
    date: '2023-07-01',
    reviewedBy: 'Alice',
    description: 'I absolutely loved this product! Highly recommended.',
  },
  {
    id: 2,
    date: '2023-06-28',
    reviewedBy: 'Bob',
    description: 'Great quality and excellent customer service.',
  },
  {
    id: 3,
    date: '2023-06-30',
    reviewedBy: 'Charlie',
    description: 'The product exceeded my expectations. Well worth the price.',
    img: peperoniPizza,
  },
  {
    id: 4,
    date: '2023-07-02',
    reviewedBy: 'David',
    description: 'I have been using this product for a month now and it has been fantastic.',
    img: vegeterianPizza,
  },
  {
    id: 5,
    date: '2023-07-04',
    reviewedBy: 'Eve',
    description: 'The product exceeded my expectations. Well worth the price.',
  },
];
interface ReviewCardProps {
  id: number;
  date: string;
  reviewedBy: string;
  description?: string;
  img?: ImageSourcePropType;
}
const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

type NavigationProps = NativeStackScreenProps<RootBottomStackParamList>;
const RestaurantReviewsScreen = ({ route, navigation }: Props) => {
  const usenavigation = useNavigation<NavigationProps['navigation']>();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    usenavigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  }, [usenavigation]);
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
          <RNButton
            size="sm"
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
            onPress={() => navigation.goBack()}
            centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
          />
          <RNText variant="subtitle">Ratings&Reviews</RNText>
          <Box></Box>
        </Box>

        {/** comment & review */}
        <Box
          direction="horizontal"
          spacing={{ mx: 10, mr: 20, mb: 25, mt: 10 }}
          gap={10}
          onPress={() => navigation.navigate('AddReview')}
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
        <Box direction="vertical">
          {reviewData.map((item: ReviewCardProps) => (
            <ReviewCard key={`key_${item.id}`} {...item} />
          ))}
        </Box>
        <Box h={100}></Box>
      </StyledScrollView>
      <Box
        flex={1}
        spacing={{ p: 10 }}
        bg="background"
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
          left: 0,
          right: 0,
        }}
      >
        <RNButton
          onPress={() => navigation.navigate('AddReview')}
          style={{ width: '100%' }}
          title="Leave a review"
        />
      </Box>
      <RNModal isOpen={isOpen} onClose={closeModal}>
        <ReviewForm />
      </RNModal>
    </BackgoundContainer>
  );
};

export default RestaurantReviewsScreen;
