import { RequestHandler } from '../config';

interface ReviwDTO {
  page: number;
  limit: number;
}
class ReviewsAPI {
  public static async fetchReviews() {
    return RequestHandler({
      url: '/reviews',
      method: 'GET',
    });
  }
  public static async fetchReviewById(id: number) {
    return RequestHandler({
      url: `/reviews/${id}`,
      method: 'GET',
    });
  }
  public static async fetchReviewsByRestaurantId(restaurantId: number) {
    return RequestHandler({
      url: `/reviews?restaurantId.id=${restaurantId}`,
      method: 'GET',
    });
  }
  public static async fetchReviewsByUserId(userId: number | string) {
    return RequestHandler({
      url: `/reviews?reviewedBy.id=${userId}`,
      method: 'GET',
    });
  }

  public static async fetchReviewByPage(reviwDTO: ReviwDTO) {
    return RequestHandler({
      url: `/reviews?_page=${reviwDTO.page}&_limit=${reviwDTO.limit} `,
      method: 'GET',
    });
  }
}

export default ReviewsAPI;
