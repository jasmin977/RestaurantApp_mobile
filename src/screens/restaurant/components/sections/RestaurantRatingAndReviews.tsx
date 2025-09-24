import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NextIcon, UserIcon } from '../../../../assets';
import { Box, RNIcon, RNText } from '../../../../components/themed';
import { Review } from '../../../../entities';
import { RestaurantStackParamList } from '../../../../navigators/stacks';
import RatingStars from '../reviews/RatingStars';
import ReviewCard from '../cards/ReviewCard';
import { ReviewService } from '../../../../service';
import { useAuth, useReviewContext } from '../../../../context';
import { verticalScale } from '../../../../helpers';
import { useEffect } from 'react';

interface StarPercentage {
  star: number;
  percentage: number;
}
interface RestaurantRatingAndReviewsProps {
  restaurantId: number | string;
  overallRating: number;
  totalReviews: number;
  starRatingPercentages: StarPercentage[];
  navigation?: NativeStackNavigationProp<RestaurantStackParamList, 'RestaurantProfile'>;
}

const RestaurantRatingAndReviews = ({
  restaurantId,
  navigation,
  starRatingPercentages,
  overallRating,
  totalReviews,
}: RestaurantRatingAndReviewsProps) => {
  const { token } = useAuth();

  const { reviews } = useReviewContext();
  const { error, isLoading } = ReviewService.useFetchReviewsByRestaurantId(restaurantId, token);

  useEffect(() => {}, [reviews]);

  return (
    <>
      <Box
        bg="background"
        onPress={navigation ? () => navigation.navigate('RestaurantReviews') : undefined}
        spacing={{ p: 20 }}
        alignItems="flex-start"
        direction="horizontal"
        justifyContent="space-between"
      >
        <RNText variant="subtitle">Review and ratings </RNText>
        <RNIcon outline={true} color="onBackground" as={<NextIcon />} />
      </Box>
      <Box w={'90%'} rounded={10} bg="card" spacing={{ p: 20, mx: 20 }}>
        <RatingStars rating={Math.ceil(overallRating)} allStar detailed />
      </Box>
      <Box spacing={{ py: 20 }} direction="horizontal" gap={5}>
        <RNIcon outline size={20} as={<UserIcon />} />
        <RNText variant="caption">{totalReviews} user ratings</RNText>
      </Box>

      <Box gap={10} spacing={{ px: 20 }}>
        {starRatingPercentages.map(starPercentage => (
          <Box
            key={starPercentage.star}
            direction="horizontal"
            gap={5}
            justifyContent="space-between"
          >
            <RNText variant="body">{starPercentage.star} Star</RNText>
            <Box h={verticalScale(10)} rounded={5} bg="card" flex={1} alignItems="flex-start">
              <Box
                h={verticalScale(8)}
                rounded={5}
                bg="primary"
                w={`${starPercentage.percentage}%`}
              ></Box>
            </Box>
            <RNText variant="caption">{Math.ceil(starPercentage.percentage)}%</RNText>
          </Box>
        ))}
      </Box>

      {/*  <StarPercentage /> */}

      <Box direction="vertical" spacing={{ my: 30 }}>
        {reviews.map((item: Review, idx: number) => (
          <ReviewCard key={`reviewsData_key__${item.id}_${idx}`} {...item} />
        ))}
      </Box>
    </>
  );
};

export default RestaurantRatingAndReviews;
