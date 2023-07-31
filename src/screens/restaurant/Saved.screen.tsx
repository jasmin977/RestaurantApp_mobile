import { Restaurant } from '../../entities';
import { RestaurantService } from '../../service';
import RestaurantCard from './components/cards/RestaurantCard';
import { useSearch } from '../../hooks';
import { RootNavigationProps } from '../../navigators/ROUTES';
import { SearchableLayout } from '../../components/layout';

const SavedRestaurants = ({ navigation }: RootNavigationProps) => {
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

export default SavedRestaurants;
