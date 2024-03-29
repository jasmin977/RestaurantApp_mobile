import { Restaurant } from '../../entities';
import { RestaurantService } from '../../service';
import RestaurantCard from './components/cards/RestaurantCard';
import { useSearch } from '../../hooks';
import { RootNavigationProps } from '../../navigators/ROUTES';
import { SearchableLayout } from '../../components/layout';
import { useAuth } from '../../context';
import { useEffect, useState } from 'react';

const SavedRestaurants = ({ navigation }: RootNavigationProps) => {
  const { token } = useAuth();
  const { data: restaurantsData, isLoading, error } = RestaurantService.useFetchRestaurants(token);
  const [searchText, setSearchText] = useState('');
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);

  useEffect(() => {
    if (restaurantsData.data.restaurants) {
      const loadedData = restaurantsData.data.restaurants as Restaurant[];
      setSearchResults(loadedData);
    }
  }, []);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
    setIsSearchClicked(true);
    const filtered = searchResults.filter((item: Restaurant) => {
      const propertyValue = item['name'];
      if (typeof propertyValue === 'string') {
        return propertyValue.toLowerCase().includes(searchText.toLowerCase());
      }
      return false;
    });
    setSearchResults(filtered || []);
  };
  const cancelSearch = () => {
    setSearchText('');
  };

  return (
    <SearchableLayout
      renderItem={({ item }) => <RestaurantCard navigation={navigation} item={item} />}
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
