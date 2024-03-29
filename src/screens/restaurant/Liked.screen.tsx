import { RootNavigationProps } from '../../navigators/ROUTES';
import { RestaurantService } from '../../service';
import RestaurantCard from './components/cards/RestaurantCard';
import { Restaurant } from '../../entities';
import { useSearch } from '../../hooks';
import { SearchableLayout } from '../../components/layout';
import { useAuth } from '../../context';

const LikedRestaurants = ({ navigation }: RootNavigationProps) => {
  const { token } = useAuth();

  const { searchText, setSearchText, searchResults, isLoading, error, handleSearch, cancelSearch } =
    useSearch<Restaurant>(() => RestaurantService.useFetchRestaurants(token), 'name');

  return (
    <SearchableLayout
      renderItem={({ item }) => <RestaurantCard navigation={navigation} item={item} />}
      navigation={navigation}
      title="My Favorites"
      searchText={searchText}
      setSearchText={setSearchText}
      searchResults={searchResults}
      handleSearch={handleSearch}
      cancelSearch={cancelSearch}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default LikedRestaurants;
