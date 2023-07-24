import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { Box, RNIcon, RNText } from '../../../components/themed';
import { Review } from '../../../components/common';
import { Restaurant } from '../../../entities';

import { Image } from 'react-native';

interface Props {}

const SearchCardItem = (item: Restaurant) => {
  return (
    <Box bg="card" direction="horizontal" flex={1} gap={10} rounded={10} spacing={{ p: 10 }}>
      <Box direction="horizontal" flex={1}>
        <Image
          source={{ uri: item.img }}
          style={{ flex: 1, width: '100%', height: '100%', aspectRatio: 1, borderRadius: 10 }}
        />
      </Box>
      <Box flex={3} alignItems="flex-start">
        <Box direction="horizontal" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1} alignItems="flex-start">
            <RNText variant="h5" numberOfLines={2} ellipsizeMode="tail">
              {item.name}{' '}
            </RNText>
          </Box>
        </Box>

        <RNText variant="subtitle" style={{ fontSize: 15 }}>
          {item.location}
        </RNText>

        <Review rating={4} />
      </Box>
    </Box>
  );
};

export default SearchCardItem;
