import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NextIcon, UserIcon } from '../../../../assets';
import { Box, RNIcon, RNText } from '../../../../components/themed';
import { Review } from '../../../../entities';
import { RestaurantStackParamList } from '../../../../navigators/stacks';
import RatingStars from '../reviews/RatingStars';
import StarPercentage from '../reviews/StarPercentage';
import ReviewCard from '../cards/ReviewCard';

interface RestaurantRatingAndReviewsProps {
  data: Review[];
  navigation: NativeStackNavigationProp<RestaurantStackParamList, 'RestaurantProfile'>;
}

const RestaurantRatingAndReviews = ({ data, navigation }: RestaurantRatingAndReviewsProps) => {
  return (
    <>
      <Box
        bg="background"
        onPress={() => navigation.navigate('RestaurantReviews')}
        spacing={{ p: 20 }}
        alignItems="flex-start"
        direction="horizontal"
        justifyContent="space-between"
      >
        <RNText variant="subtitle">Review and ratings </RNText>
        <RNIcon outline={true} color="onBackground" as={<NextIcon />} />
      </Box>
      <Box w={'90%'} rounded={10} bg="card" spacing={{ p: 20, mx: 20 }}>
        <RatingStars rating={4} detailed />
      </Box>
      <Box spacing={{ py: 20 }} direction="horizontal" gap={5}>
        <RNIcon outline size={20} as={<UserIcon />} />
        <RNText variant="caption">{data.length} user ratings</RNText>
      </Box>
      <StarPercentage />

      <Box direction="vertical" spacing={{ my: 30 }}>
        {data.map((item: Review, idx: number) => (
          <ReviewCard key={`reviewsData_key__${item.id}_${idx}`} {...item} />
        ))}
      </Box>
    </>
  );
};

export default RestaurantRatingAndReviews;
