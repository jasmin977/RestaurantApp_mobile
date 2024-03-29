import { Timestamp } from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';
import { MenuCategory } from './MenuCategory';

interface StarPercentage {
  star: number;
  percentage: number;
}
interface Restaurant {
  id: number;
  name: string;
  city: string;
  state: string;
  streetAddress: string;
  cuisineType: string;
  imageUrl: string;
  logoUrl: string;
  rating: number;
  description: string;
  startWorkingTime: Timestamp;
  finishWorkingTime: Timestamp;
  menu_categories: MenuCategory[];
  tage: string;
  starRatingPercentages?: StarPercentage[];
  overallRating?: number;
  totalReviews?: number;

  latitude: number;
  longitude: number;
}
export default Restaurant;
