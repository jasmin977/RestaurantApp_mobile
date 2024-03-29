import { useMutationReq, useQueryReq } from '../hooks/useRequest';
import ReviewsAPI from '../api/ReviewAPI';

import { AxiosError } from 'axios';
import { useAuth, useReviewContext } from '../context';
import { Review } from '../entities';
import { useQueryClient } from 'react-query';

const ReviewService = {
  useFetchReviews: (token: string | null) => {
    return useQueryReq({
      queryKey: 'useFetchReviews',
      request: () => ReviewsAPI.fetchReviews(token),

      onError: (err: AxiosError) => console.log('onError: useFetchReviews', err.response?.data),
    });
  },
  useFetchReviewByID: (id: number, token: string | null) => {
    const { data, ...rest } = useQueryReq({
      queryKey: `useFetchReviewByID`,
      request: () => ReviewsAPI.fetchReviewById(id, token),
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  },
  useFetchReviewsByRestaurantId: (restaurantId: number | string | null, token: string | null) => {
    if (restaurantId === null) {
      return { data: null, isLoading: true, error: null };
    }
    const { setReviews } = useReviewContext();
    return useQueryReq({
      queryKey: `useFetchReviewsByRestaurantId${restaurantId}`,
      request: () => ReviewsAPI.fetchReviewsByRestaurantId(restaurantId, token),
      onSuccess: ({ data }) => {
        console.log('🚀 ~ file: Reviews.ts:36 ~ ReviewService ~ data:', data[0]);
        setReviews(data[0]);
      },
      onError: (err: AxiosError) =>
        console.log('onError :useFetchReviewsByRestaurantId', err.response?.data),
    });
  },
  useFetchReviewsByUserId: (userId: number | string, token: string | null) => {
    return useQueryReq({
      queryKey: `useFetchReviewsByUserId${userId}`,
      request: () => ReviewsAPI.fetchReviewsByUserId(userId, token),
      onError: (err: AxiosError) =>
        console.log('onError ;useFetchReviewsByUserId', err.response?.data),
    });
  },
  addReview: (restaurantId: number | string) => {
    const { setReviews, reviews } = useReviewContext();
    const { token } = useAuth();

    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutationReq({
      queryKey: 'addReview',
      request: ReviewsAPI.addReview,
      onSuccess: ({ data }) => {
        // Extract content within the brackets
        //   const contentWithinBrackets = data.substring(2, data.length);

        // const jsonData = JSON.parse(contentWithinBrackets);
        // queryClient.invalidateQueries([`useFetchReviewsByRestaurantId${restaurantId}`]);
        console.log(
          '🚀 ~ file: Reviews.ts:65 ~ ReviewService ~ addReview ~ data.review:',
          data.review
        );
        setReviews((prevReviews: Review[]) => [data.review, ...prevReviews]);
      },
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });

    const addReview = (review: Review) => {
      const newReview = {
        caption: review.caption,
        rating: review.rating,
        restaurant_id: review.restaurant_id.id,
      };
      console.log('🚀 ~ file: Reviews.ts:78 ~ addReview ~ newReview:', newReview);
      mutate({ data: newReview, token: token });
    };

    return { ...rest, addReview };
  },

  useFetchReviewByPage: () => {
    const { mutate, ...rest } = useMutationReq({
      queryKey: `useFetchReviewsByPage`,
      request: ReviewsAPI.fetchReviewByPage,
      // onSuccess: ({ data }) => setReviews(data),
      onError: (err: AxiosError) =>
        console.log('onError useFetchReviewsByPage', err.response?.data),
    });
    return { mutate, ...rest };
  },
};

export default ReviewService;
