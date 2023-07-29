import { useMutationReq, useQueryReq } from '../hooks/useRequest';
import ReviewsAPI from '../api/ReviewAPI';

import { AxiosError } from 'axios';

class ReviewService {
  public static useFetchReviews() {
    return useQueryReq({
      queryKey: 'useFetchReviews',
      request: () => ReviewsAPI.fetchReviews(),
      //onSuccess: ({ data }) => console.log('onSuccess', data),
      // onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }
  public static useFetchReviewByID(id: number) {
    const { data, ...rest } = useQueryReq({
      queryKey: `useFetchRestaurantByID`,
      request: () => ReviewsAPI.fetchReviewById(id),
    });
  }
  public static useFetchReviewByPage() {
    const { mutate, ...rest } = useMutationReq({
      queryKey: `useFetchRestaurantByPage`,
      request: ReviewsAPI.fetchReviewByPage,
      /*   onSuccess: ({ data }) => console.log('onSuccess', data),
      onError: (err: AxiosError) => console.log('onError', err.response?.data), */
    });
    return { mutate, ...rest };
  }
}

export default ReviewService;
