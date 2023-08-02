import { MenuCategory } from './MenuCategory';
import Coords from './coordinate';

interface Restaurant {
  id: number;
  name: string;
  location: string;
  img: string;
  logo: string;
  rating: number;
  description: string;
  workingTime: string;
  menu: MenuCategory[];
  tags: string[];
  coordinate: Coords;
}
export default Restaurant;
