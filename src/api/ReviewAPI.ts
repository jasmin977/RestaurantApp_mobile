import { RequestHandler } from '../config';

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
}

export default ReviewsAPI;
