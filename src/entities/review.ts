import Restaurant from './restaurant';
import user from './user';

interface Review {
  id?: number;
  caption: string;
  user_id?: user;
  user?: user;
  restaurant_id: Restaurant;
  restaurant?: Restaurant;
  created_at?: Date;

  updated_at?: Date;
  url?: string;
  rating: number;
  images?: Image[];
}

interface Image {
  id: number;
  url: string;
  review_id: number;
  created_at: Date;
  updated_at: Date;
}
export default Review;
