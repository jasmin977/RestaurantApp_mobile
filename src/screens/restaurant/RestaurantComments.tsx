import { FunctionComponent } from 'react';
import { Image, ImageSourcePropType, Text } from 'react-native';
import { AVATAR, BackIcon, peperoniPizza, vegeterianPizza } from '../../assets';
import { styled } from 'styled-components/native';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../../components/themed';
import { ReviewCard } from './components';
import { BackgoundContainer } from '../../components/common';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../../navigators/stacks';

interface RestaurantCommentScreenProps {}

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
type Props = NativeStackScreenProps<RestaurantStackParamList, 'RestaurantComments'>;
const RestaurantCommentScreen = ({ route, navigation }: Props) => {
  return (
    <BackgoundContainer>
      <StyledScrollView>
        <Box
          gap={40}
          direction="horizontal"
          spacing={{ px: 20 }}
          style={{ position: 'absolute', top: 40 }}
        >
          <RNButton
            size="sm"
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
            onPress={() => navigation.goBack()}
            centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
          />
          <RNText variant="subtitle">Comments</RNText>
        </Box>
        <Box h={100} />
        <Box direction="horizontal" spacing={{ mx: 10, mr: 20, my: 25 }} gap={10}>
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
          <RNInput placeholder="give you feedback" />
        </Box>
        <Box direction="vertical">
          {reviewData.map((item: ReviewCardProps) => (
            <ReviewCard key={`key_${item.id}`} {...item} />
          ))}
        </Box>
      </StyledScrollView>
    </BackgoundContainer>
  );
};

export default RestaurantCommentScreen;
