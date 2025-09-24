import { AxiosError } from 'axios';
import { useMutationReq, useQueryReq } from '../hooks/useRequest';
import RestaurantsAPI from '../api/RestaurantsAPI';

class RestaurantService {
  public static useFetchRestaurants(token: string | null) {
    return useQueryReq({
      queryKey: 'useFetchRestaurants',
      request: () => RestaurantsAPI.fetchRestaurants(token),
      //onSuccess: ({ data }) => console.log('onSuccess', data),
      onError: (err: AxiosError) => console.log('onError; useFetchRestaurants', err.response?.data),
    });
  }
  public static useFetchRestaurantByID(id: number | string | null, token: string | null) {
    if (id === null) {
      return { data: null, isLoading: true, error: null };
    }
    return useQueryReq({
      queryKey: `useFetchRestaurantByID${id}`,
      request: () => RestaurantsAPI.fetchRestaurantById(id, token),
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }

  public static useFetchRestaurantByPage() {
    const { mutate, ...rest } = useMutationReq({
      queryKey: `useFetchRestaurantByPage`,
      request: RestaurantsAPI.fetchRestaurantByPage,
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
    return { mutate, ...rest };
  }

  public static likeRestaurant() {
    return useMutationReq({
      queryKey: 'likeRestaurant',
      request: RestaurantsAPI.likeRestaurant,
      onSuccess: ({ data }) => {},
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }
  public static unlikeRestaurant() {
    return useMutationReq({
      queryKey: 'unlikeRestaurant',
      request: RestaurantsAPI.unlikeRestaurant,
      onSuccess: ({ data }) => {},
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }
  public static saveRestaurant() {
    return useMutationReq({
      queryKey: 'saveRestaurant',
      request: RestaurantsAPI.saveRestaurant,
      onSuccess: ({ data }) => {},
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }
  public static unsaveRestaurant() {
    return useMutationReq({
      queryKey: 'unsaveRestaurant',
      request: RestaurantsAPI.unsaveRestaurant,
      onSuccess: ({ data }) => {},
      onError: (err: AxiosError) => console.log('onError', err.response?.data),
    });
  }
}

export default RestaurantService;
