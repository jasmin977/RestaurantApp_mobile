import { MenuCategory } from "./MenuCategory";

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  img: ImageSourcePropType;
  rating: number;
  description: string;
  workingTime: string;
  menu: MenuCategory[];
}
export default Restaurant;
