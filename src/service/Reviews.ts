import { useQueryReq } from '../hooks/useRequest';
import ReviewsAPI from '../api/ReviewAPI';
import { Review } from '../entities';

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
      /*  onSuccess:({data})=>{
        data.map((item:Review)=>{
          const{reviewedBy,restaurantId}=data

        })
      } */
    });
  }
}

export default ReviewService;
