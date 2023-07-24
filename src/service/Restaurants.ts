import { AxiosError } from 'axios';
import { useQueryReq } from '../hooks/useRequest';
import RestaurantsAPI from '../api/RestaurantsAPI';

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
}

export default RestaurantService;
