import { useEffect, useState } from 'react';
import { BackIcon, CloseIcon, FilterIcon, SearchIcon } from '../../assets';
import { BackButton, BackgoundContainer } from '../../components/common';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../../components/themed';
import { RootNavigationProps } from '../../navigators/ROUTES';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { RestaurantService } from '../../service';
import { Restaurant, user } from '../../entities';
import { FlatList } from 'react-native-gesture-handler';
import SearchHistoryCache from '../../cache/searchHistoryCache';
import { scale } from '../../helpers';
import RestaurantCard from './components/cards/RestaurantCard';
import { useAuth } from '../../context';
import UserService from '../../service/Users';
import UserCard from './components/cards/UserCard';

interface SeachScreenProps {}

const SeachScreen: React.FC<SeachScreenProps> = () => {
  const navigation = useNavigation<RootNavigationProps['navigation']>();
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { token } = useAuth();

  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [searchUsersResults, setUsersSearchResults] = useState<user[]>([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const loadSearchHistory = () => {
    try {
      const history = SearchHistoryCache.getSearchHistory();
      if (history != null) {
        const parsedArray = JSON.parse(history);
        setSearchHistory(parsedArray);
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const deleteItemFromSearchHistory = (itemToDelete: string) => {
    try {
      const filteredHistory = searchHistory.filter(item => item !== itemToDelete);
      setSearchHistory(filteredHistory);
      SearchHistoryCache.storeSearchHistory(JSON.stringify(filteredHistory));
    } catch (error) {
      console.error('Error deleting search history item:', error);
    }
  };

  useEffect(() => {
    loadSearchHistory();
  }, []);
  const saveSearchHistory = (query: string) => {
    try {
      const updatedHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 5); // Save only the latest 5 search queries
      setSearchHistory(updatedHistory);
      SearchHistoryCache.storeSearchHistory(JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const {
    data: restaurantData,
    isLoading: restaurantIsLoading,
    error: restaurantError,
  } = RestaurantService.useFetchRestaurants(token);
  const {
    data: usersData,
    isLoading: usersIsLoading,
    error: usersError,
  } = UserService.useFetchUsers(token);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
    setIsSearchClicked(true);
    const filtered = restaurantData.data.restaurants.filter((restaurant: Restaurant) =>
      restaurant.name.toLowerCase().includes(searchText.toLowerCase())
    );
    const filteredUsers = usersData.data.users.filter((restaurant: user) =>
      restaurant.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filtered);
    setUsersSearchResults(filteredUsers);
    saveSearchHistory(searchText);
  };

  const searchItem = ({ item }: { item: string }) => (
    <Box direction="horizontal" justifyContent="space-between">
      <Box alignItems="flex-start" flex={1} onPress={() => handleSearch(item)}>
        <RNText variant="subtitle">{item}</RNText>
      </Box>
      <TouchableOpacity onPress={() => deleteItemFromSearchHistory(item)}>
        <RNIcon outline as={<CloseIcon />} />
      </TouchableOpacity>
    </Box>
  );

  return (
    <BackgoundContainer>
      <Box
        bg="background"
        direction="horizontal"
        justifyContent="space-between"
        spacing={{ px: 20, py: 10 }}
      >
        <BackButton onPress={() => navigation.goBack()} />

        <RNText variant="subtitle" style={{ fontSize: scale(22) }}>
          Search
        </RNText>
        <RNButton style={{ opacity: 0 }} size="xs" centerIcon={<RNIcon as={<BackIcon />} />} />
      </Box>
      <Box w={'100%'} direction="horizontal" spacing={{ px: 20, py: 10 }} gap={10}>
        <RNInput
          returnKeyType="search"
          onSubmitEditing={() => handleSearch(searchText)}
          placeholder="search for.."
          value={searchText}
          onChangeText={text => {
            setIsSearchClicked(false);
            setSearchText(text);
          }}
          leftIcon={<RNIcon outline as={<SearchIcon />} color="primary" />}
          rightIcon={
            searchText.trim().length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  setSearchResults([]);
                  setSearchText('');
                }}
              >
                <RNIcon outline as={<CloseIcon />} color="onCard" />
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
        />

        <RNButton
          size="sm"
          centerIcon={<RNIcon as={<FilterIcon />} outline={true} color="white" />}
        />
      </Box>

      {searchResults.length === 0 && searchText.length > 0 && isSearchClicked && (
        <Box spacing={{ py: 20 }}>
          <RNText>No restaurants results..</RNText>
        </Box>
      )}
      {searchUsersResults.length === 0 && searchText.length > 0 && isSearchClicked && (
        <Box spacing={{ py: 20 }}>
          <RNText>No users results..</RNText>
        </Box>
      )}

      {searchText.length === 0 ||
      (searchResults.length === 0 && searchUsersResults.length === 0 && !isSearchClicked) ? (
        <View>
          <FlatList
            data={searchHistory}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
            renderItem={searchItem}
            keyExtractor={(item, index) => `item_${index}`}
          />
          <Box
            onPress={() => {
              SearchHistoryCache.clearSearchHistory;
              setSearchHistory([]);
            }}
          >
            <RNText variant="subtitle">Clear search history</RNText>
          </Box>
        </View>
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: 20, gap: 10, paddingBottom: 20 }}
            ListHeaderComponent={<RNText variant="subtitle">Result for {searchText}..</RNText>}
            data={[...searchResults, ...searchUsersResults]}
            renderItem={({ item }) => {
              // Check the type of item to decide whether it's a restaurant or user
              if ('cuisineType' in item) {
                return <RestaurantCard navigation={navigation} item={item} />;
              } else {
                return <UserCard navigation={navigation} item={item} />;
              }
            }}
            keyExtractor={(item, index) => `COMBINED_ITEM_${index}`}
          />
        </>
      )}
    </BackgoundContainer>
  );
};

export default SeachScreen;
