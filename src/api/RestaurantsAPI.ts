import { RequestHandler } from '../config';

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
}

export default RestaurantsAPI;
