import { RequestHandler } from '../config';
import { Review } from '../entities';

interface RestaurantDTO {
  page: number;
  limit: number;
}
class RestaurantsAPI {
  public static async fetchRestaurants() {
    return RequestHandler({
      url: '/restaurants',
      method: 'GET',
    });
  }
  public static async fetchRestaurantById(id: number) {
    return RequestHandler({
      url: `/restaurants/${id}`,
      method: 'GET',
    });
  }
  public static async addReview(data: Review) {
    return RequestHandler({
      url: `/reviews`,
      method: 'POST',
      data: data,
    });
  }
  public static async fetchRestaurantByPage(restaurantDTO: RestaurantDTO) {
    return RequestHandler({
      url: `/restaurants?_page=${restaurantDTO.page}&_limit=${restaurantDTO.limit} `,
      method: 'GET',
    });
  }
}

export default RestaurantsAPI;
