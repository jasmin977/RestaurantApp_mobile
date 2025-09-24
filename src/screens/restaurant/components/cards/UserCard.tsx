import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Restaurant, user } from '../../../../entities';
import { Box, RNButton, RNIcon, RNText } from '../../../../components/themed';
import { SaveIcon } from '../../../../assets';
import { scale } from '../../../../helpers';
import RatingStars from '../reviews/RatingStars';
import { RootNavigationProps } from '../../../../navigators/ROUTES';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../context';
import { BASE_URL } from '../../../../CONSTANTS';

interface UserCardProps {
  navigation: RootNavigationProps['navigation'];
  item: user;
}
const UserCard: React.FC<UserCardProps> = ({ navigation, item }) => {
  const { theme } = useTheme();

  return (
    <Box bg="card" direction="horizontal" flex={1} gap={10} rounded={10} spacing={{ p: 10 }}>
      <Box
        direction="horizontal"
        flex={1}
        onPress={() => {
          navigation.navigate('Profile', { id: item.id });
        }}
      >
        <Image
          source={{ uri: `http://${BASE_URL}:8000/storage/${item.avatar}` }}
          style={{ flex: 1, width: '100%', height: '100%', aspectRatio: 1, borderRadius: 10 }}
        />
      </Box>
      <Box flex={3} alignItems="flex-start">
        <Box direction="horizontal" justifyContent="space-between" alignItems="center">
          <Box
            flex={1}
            alignItems="flex-start"
            onPress={() => {
              navigation.navigate('Profile', { id: item.id });
            }}
          >
            <RNText variant="h5" numberOfLines={2}>
              {item.name}
            </RNText>
            <RNText variant="caption" numberOfLines={2}>
              {item.email}
            </RNText>
          </Box>

          <RNButton
            size="sm"
            variant={item.isFollowing ? 'outline' : 'solid'}
            title={item.isFollowing ? 'Unfollow' : 'Follow'}
            style={{
              borderRadius: 40,

              shadowColor: theme.colors.primary,
              elevation: 10,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserCard;
