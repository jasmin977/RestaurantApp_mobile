// ProfileHeader.tsx
import React from 'react';
import { View } from 'react-native';
import { Avatar, Box, RNButton, RNText } from '../../../../components/themed';
import { useAuth, useTheme } from '../../../../context';
import { user } from '../../../../entities';
import { RootStackParamList } from '../../../../navigators/ROUTES';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface ProfileHeaderProps {
  userData: user;
  isFollow: boolean;
  onToggleFollow: () => void;
  navigation?: NativeStackNavigationProp<RootStackParamList, 'Profile', undefined>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userData,
  isFollow,
  onToggleFollow,
  navigation,
}) => {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <View style={{ paddingVertical: 10 }}>
      <Box gap={10}>
        <Avatar src={userData.profileImg} size={80} />

        <RNText variant="h4">{userData.username}</RNText>
        <RNText align="center" variant="caption">
          {userData.email}
        </RNText>
        {userData.bio && (
          <RNText align="center" variant="subtitle">
            {userData.bio}
          </RNText>
        )}
      </Box>

      {userData?.id === user?.id && navigation ? (
        <Box direction="horizontal" spacing={{ py: 20 }}>
          {/* The "Edit Profile" button */}
          <RNButton
            onPress={() => navigation.navigate('EditProfile')}
            size="md"
            title="Edit Profile"
            style={{
              borderRadius: 40,
              width: '50%',
              shadowColor: theme.colors.primary,
              elevation: 10,
            }}
          />
        </Box>
      ) : (
        <Box direction="horizontal" spacing={{ py: 20 }}>
          {/* The "Edit Profile" button */}
          <RNButton
            onPress={onToggleFollow}
            size="md"
            variant={isFollow ? 'outline' : 'solid'}
            title={isFollow ? 'Unfollow' : 'Follow'}
            style={{
              borderRadius: 40,
              width: '50%',
              shadowColor: theme.colors.primary,
              elevation: 10,
            }}
          />
        </Box>
      )}
      <Box direction="horizontal" justifyContent="space-between" spacing={{ px: 20 }}>
        <Box>
          <RNText variant="h3">120</RNText>
          <RNText variant="subtitle">Following</RNText>
        </Box>
        <Box w={1} h={'100%'} bg="card" rounded={10} />
        <Box>
          <RNText variant="h3">10K</RNText>
          <RNText variant="subtitle">Followers</RNText>
        </Box>
        <Box w={1} h={'100%'} bg="card" rounded={10} />
        <Box>
          <RNText variant="h3">205</RNText>
          <RNText variant="subtitle">Likes</RNText>
        </Box>
      </Box>
      <Box direction="horizontal" justifyContent="space-between" spacing={{ px: 20, pt: 20 }}>
        <RNText variant="h5">My Reviews</RNText>

        <RNText style={{ fontWeight: 'bold' }} color="primary">
          See All
        </RNText>
      </Box>
    </View>
  );
};

export default ProfileHeader;
