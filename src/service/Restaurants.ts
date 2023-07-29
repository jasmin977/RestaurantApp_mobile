import { AxiosError } from 'axios';
import { useMutationReq, useQueryReq } from '../hooks/useRequest';
import RestaurantsAPI from '../api/RestaurantsAPI';
import { Review } from '../entities';

class RestaurantService {
  public static useFetchRestaurants() {
    return useQueryReq({
      queryKey: 'useFetchRestaurants',
      request: () => RestaurantsAPI.fetchRestaurants(),
      //onSuccess: ({ data }) => console.log('onSuccess', data),
      // onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }
  public static useFetchRestaurantByID(id: number) {
    return useQueryReq({
      queryKey: `useFetchRestaurantByID`,
      request: () => RestaurantsAPI.fetchRestaurantById(id),
    });
  }
  public static addReview() {
    const { mutate, ...rest } = useMutationReq({
      queryKey: 'addReview',
      request: RestaurantsAPI.addReview,
      onSuccess: ({ data }) => {
        const reviw = data;
        console.log('🚀 ~ file: Restaurants.ts:27 ~ RestaurantService ~ addReview ~ reviw:', reviw);
      },
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });

    const onAddReview = async (data: Review) => {
      mutate({
        caption: data.caption,
        rate: data.rate,
        restaurantId: data.restaurantId,
        reviewedBy: data.reviewedBy,
        reviewedAt: data.reviewedAt,
        img: data.img,
      });
    };

    return { onAddReview, ...rest };
  }
}

export default RestaurantService;
