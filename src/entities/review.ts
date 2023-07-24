import Restaurant from './restaurant';
import user from './user';

interface Review {
  _id: number;
  caption: string;
  reviewedBy: user;
  restaurantId: Restaurant;
  reviewedAt: Date;
  img: string;
  rate: number;
}
export default Review;
