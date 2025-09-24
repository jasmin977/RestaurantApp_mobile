import { RequestHandler } from '../config';
import { useAuth } from '../context';
import { Review } from '../entities';

interface ReviwDTO {
  page: number;
  limit: number;
}
class ReviewsAPI {
  public static async fetchReviews(token: string | null) {
    return RequestHandler({
      url: '/reviews',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async fetchReviewById(id: number, token: string | null) {
    return RequestHandler({
      url: `/reviews/${id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public static async fetchReviewsByRestaurantId(
    restaurantId: number | string,
    token: string | null
  ) {
    return RequestHandler({
      url: `/reviews?restaurant_id=${restaurantId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public static async addReview({ data, token }: { data: any; token: string | null }) {
    console.log('🚀 ~ file: ReviewAPI.ts:42 ~ ReviewsAPI ~ addReview ~ data:', data);
    return RequestHandler({
      url: `/reviews`,
      method: 'POST',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  public static async fetchReviewsByUserId(userId: number | string, token: string | null) {
    return RequestHandler({
      url: `/reviews?reviewedBy.id=${userId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public static async fetchReviewByPage(reviwDTO: ReviwDTO, token: string | null) {
    return RequestHandler({
      url: `/reviews?page=${reviwDTO.page}&limit=${reviwDTO.limit}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default ReviewsAPI;
