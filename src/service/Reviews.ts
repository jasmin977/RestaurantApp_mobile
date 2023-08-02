import { useMutationReq, useQueryReq } from '../hooks/useRequest';
import ReviewsAPI from '../api/ReviewAPI';

import { AxiosError } from 'axios';
import { useReviewContext } from '../context';

class ReviewService {
  public static useFetchReviews() {
    return useQueryReq({
      queryKey: 'useFetchReviews',
      request: () => ReviewsAPI.fetchReviews(),

      // onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }
  public static useFetchReviewByID(id: number) {
    const { data, ...rest } = useQueryReq({
      queryKey: `useFetchReviewByID`,
      request: () => ReviewsAPI.fetchReviewById(id),
    });
  }
  public static useFetchReviewsByRestaurantId(restaurantId: number | string | null) {
    if (restaurantId === null) {
      return { data: null, isLoading: true, error: null };
    }
    const { setReviewsByRestaurantId } = useReviewContext();
    return useQueryReq({
      queryKey: `useFetchReviewsByRestaurantId${restaurantId}`,
      request: () => ReviewsAPI.fetchReviewsByRestaurantId(restaurantId),
      onSuccess: ({ data }) => setReviewsByRestaurantId(data),
    });
  }
  public static useFetchReviewsByUserId(userId: number | string) {
    return useQueryReq({
      queryKey: `useFetchReviewsByUserId${userId}`,
      request: () => ReviewsAPI.fetchReviewsByUserId(userId),
    });
  }

  /* public static useFetchReviewsByRestaurantId() {
    const { mutate, ...rest } = useMutationReq({
      queryKey: `useFetchReviewsByRestaurantId`,
      request: ReviewsAPI.fetchReviewsByRestaurantId,
    });
    return { mutate, ...rest };
  } */
  public static useFetchReviewByPage() {
    const { mutate, ...rest } = useMutationReq({
      queryKey: `useFetchReviewsByPage`,
      request: ReviewsAPI.fetchReviewByPage,
      // onSuccess: ({ data }) => setReviews(data),
      // onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
    return { mutate, ...rest };
  }
}

export default ReviewService;
