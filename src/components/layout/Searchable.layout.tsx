import { ListRenderItem, FlatList } from 'react-native';
import React from 'react';
import { BackButton, BackgoundContainer, Loader } from '../common';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../themed';
import { scale } from '../../helpers';
import { BackIcon, CloseIcon, FilterIcon, SearchIcon } from '../../assets';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { RootStackParamList } from '../../navigators/ROUTES';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CenteredContainer from '../common/containers/Centered';

type SearchableListScreenProps = {
  title: string;
  searchText: string;
  setSearchText: (text: string) => void;
  searchResults: any[];
  handleSearch: (searchText: string) => void;
  cancelSearch: () => void;
  isLoading: boolean;
  error: any;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  renderItem: ListRenderItem<any>;
};

const SearchableLayout: React.FC<SearchableListScreenProps> = ({
  title,
  searchText,
  setSearchText,
  searchResults,
  handleSearch,
  cancelSearch,
  isLoading,
  error,
  navigation,
  renderItem,
}) => {
  if (isLoading) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <Loader size={200} />
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  if (error) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>Error</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

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
          {title}
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
            setSearchText(text);
          }}
          leftIcon={<RNIcon outline as={<SearchIcon />} color="primary" />}
          rightIcon={
            searchText.trim().length > 0 ? (
              <TouchableOpacity onPress={() => cancelSearch()}>
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
      {searchResults.length === 0 && searchText.length > 0 && (
        <Box spacing={{ py: 20 }}>
          <RNText>No results..</RNText>
        </Box>
      )}
      <FlatList
        contentContainerStyle={{
          gap: 20,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${title}_${item.id}_${item.name}_${index}`}
      />
    </BackgoundContainer>
  );
};

export default SearchableLayout;
