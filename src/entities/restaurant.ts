import { MenuCategory } from './MenuCategory';
import Coords from './coordinate';

interface Restaurant {
  id: number;
  name: string;
  location: string;
  img: string;
  rating: number;
  description: string;
  workingTime: string;
  menu: MenuCategory[];
  coordinate: Coords;
}
export default Restaurant;
