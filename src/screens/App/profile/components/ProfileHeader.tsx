// ProfileHeader.tsx
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Box, RNButton, RNText } from '../../../../components/themed';
import { useAuth, useFollowContext, useTheme } from '../../../../context';
import { user } from '../../../../entities';
import { RootStackParamList } from '../../../../navigators/ROUTES';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import UserService from '../../../../service/Users';
import CenteredContainer from '../../../../components/common/containers/Centered';
import { BASE_URL } from '../../../../CONSTANTS';

interface ProfileHeaderProps {
  userId: number | string;

  navigation?: NativeStackNavigationProp<RootStackParamList, 'Profile', undefined>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userId,

  navigation,
}) => {
  const { theme } = useTheme();
  const { user, token } = useAuth();
  const {
    data: {
      data: { user: userData },
    },

    isLoading,
  } = UserService.useFetchUserByID(userId, token);
  const { isFollowing } = useFollowContext();
  const { mutate: followuser } = UserService.followUser();
  const { mutate: unfollowuser } = UserService.unFollowUser();

  if (!userData) {
    return (
      <CenteredContainer>
        <RNText>no data</RNText>
      </CenteredContainer>
    );
  }
  if (isLoading) {
    return (
      <CenteredContainer>
        <RNText>loading data</RNText>
      </CenteredContainer>
    );
  }
  /* useEffect(() => {
    if (userData) {
      setFollowers(userData.followers);
      setFollowings(userData.followings);
    }
  }, []);
 */
  const handleToggleFollow = () => {
    if (isFollowing(userData)) {
      unfollowuser({ id: userData.id, token: token });
    } else {
      followuser({ id: userData.id, token: token });
    }
  };
  return (
    <View style={{ paddingVertical: 10 }}>
      <Box gap={10}>
        <Avatar src={`http://${BASE_URL}:8000/storage/${userData.avatar}`} size={80} />

        <RNText variant="h4">{userData.name}</RNText>
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
            onPress={handleToggleFollow}
            size="md"
            variant={isFollowing(userData) ? 'outline' : 'solid'}
            title={isFollowing(userData) ? 'Unfollow' : 'Follow'}
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
          <RNText variant="h3">{userData.followings.length}</RNText>
          <RNText variant="subtitle">Following</RNText>
        </Box>
        <Box w={1} h={'100%'} bg="card" rounded={10} />
        <Box>
          <RNText variant="h3">{userData.followers.length}</RNText>
          <RNText variant="subtitle">Followers</RNText>
        </Box>
        <Box w={1} h={'100%'} bg="card" rounded={10} />
        <Box>
          <RNText variant="h3">{userData.likes?.length}</RNText>
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
