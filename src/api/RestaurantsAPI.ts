import { RequestHandler } from '../config';

import { Review } from '../entities';

interface RestaurantDTO {
  page: number;
  limit: number;
}
class RestaurantsAPI {
  public static async fetchRestaurants(token: string | null) {
    return RequestHandler({
      url: '/restaurants',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async fetchRestaurantById(id: number | string, token: string | null) {
    return RequestHandler({
      url: `/restaurants/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public static async fetchRestaurantByPage(restaurantDTO: RestaurantDTO, token: string | null) {
    return RequestHandler({
      url: `/restaurants?_page=${restaurantDTO.page}&_limit=${restaurantDTO.limit} `,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async likeRestaurant({ id, token }: { id: number | string; token: string | null }) {
    return RequestHandler({
      url: `/restaurants/${id}/like `,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async unlikeRestaurant({
    id,
    token,
  }: {
    id: number | string;
    token: string | null;
  }) {
    return RequestHandler({
      url: `/restaurants/${id}/unlike `,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async saveRestaurant({ id, token }: { id: number | string; token: string | null }) {
    return RequestHandler({
      url: `/restaurants/${id}/save `,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async unsaveRestaurant({
    id,
    token,
  }: {
    id: number | string;
    token: string | null;
  }) {
    return RequestHandler({
      url: `/restaurants/${id}/unsave `,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default RestaurantsAPI;
