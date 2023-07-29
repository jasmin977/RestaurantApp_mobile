import { RequestHandler } from '../config';
import { Review } from '../entities';

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
}

export default RestaurantsAPI;
