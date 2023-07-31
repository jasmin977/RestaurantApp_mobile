import { RootNavigationProps } from '../../navigators/ROUTES';
import { RestaurantService } from '../../service';
import RestaurantCard from './components/cards/RestaurantCard';
import { Restaurant } from '../../entities';
import { useSearch } from '../../hooks';
import { SearchableLayout } from '../../components/layout';

const LikedRestaurants = ({ navigation }: RootNavigationProps) => {
  const { searchText, setSearchText, searchResults, isLoading, error, handleSearch, cancelSearch } =
    useSearch<Restaurant>(RestaurantService.useFetchRestaurants, 'name');

  return (
    <SearchableLayout
      renderItem={RestaurantCard}
      navigation={navigation}
      title="Saved"
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
