import { useState } from 'react';
import { Image, FlatList, View, ScrollView } from 'react-native';
import { BackButton, BackgoundContainer } from '../../../components/common';
import { Box, RNButton, RNIcon, RNText } from '../../../components/themed';
import { AVATAR, BackIcon, EditIcon } from '../../../assets';
import { RootStackParamList } from '../../../navigators/ROUTES';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth, useTheme } from '../../../context';
import { Review, user } from '../../../entities';

import UserService from '../../../service/Users';
import { useLazyLoading } from '../../../hooks';
import { ReviewService } from '../../../service';
import ReviewCard from './../home/components/ReviewCard';

interface ProfileProps {}
const renderHeader = (num: number) => {
  return (
    <Box
      bg="background"
      direction="horizontal"
      justifyContent="space-between"
      spacing={{ px: 20, py: 20 }}
    >
      <Box direction="horizontal" gap={5}>
        <RNText variant="h5">My Reviews</RNText>
        <RNText variant="caption">{num} </RNText>
      </Box>
      <RNText style={{ fontWeight: 'bold' }} color="primary">
        See All
      </RNText>
    </Box>
  );
};
const renderItem = ({ item }: { item: Review }) => {
  return <ReviewCard key={`Profile_${item._id}_ `} {...item} />;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;
const Profile = ({ navigation, route }: Props) => {
  const [isFollow, setIsFollow] = useState(false);
  const id = route.params?.id;
  const { theme } = useTheme();
  const { user } = useAuth();
  const { documentData, loading, refreshing, retrieveMore } = useLazyLoading<Review>({
    initialLimit: 9,
    fetchDataAction: ReviewService.useFetchReviews(),
    sortField: '_id', // Sort by '_id' field of the Restaurant model
  });

  console.log('🚀 ~ file: Profile.tsx:22 ~ Profile ~ user:', user);
  let userData = null;
  if (id) {
    const {
      data: userProfileData,
      isLoading: userProfileIsLoading,
      error: userProfileError,
    } = UserService.useFetchUserByID(id);
    if (!userProfileIsLoading) {
      userData = userProfileData.data;
    }
  } else {
    userData = {
      id: user?.id,
      username: user?.username,
      password: user?.password,
      email: user?.email,
      gender: user?.gender,
    };
  }
  if (!userData) {
    return (
      <BackgoundContainer>
        <RNText>No profile availble</RNText>
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

        {userData.id === user?.id && (
          <RNButton
            color="card"
            size="xs"
            onPress={() => navigation.navigate('EditProfile')}
            centerIcon={<RNIcon color="onCard" as={<EditIcon />} />}
          />
        )}
      </Box>

      <FlatList
        data={documentData}
        renderItem={renderItem}
        keyExtractor={item => String(item._id + 'PROFILe' + item.caption)}
        ListHeaderComponent={
          <View style={{ paddingVertical: 10 }}>
            <Box gap={10}>
              <Image
                source={userData.profileImg ? { uri: userData.profileImg } : AVATAR}
                style={{ width: 100, height: 100, borderRadius: 100 }}
              />
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
            <Box direction="horizontal" spacing={{ py: 20 }}>
              <RNButton
                onPress={() => setIsFollow(!isFollow)}
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
            <Box
              bg="background"
              direction="horizontal"
              justifyContent="space-between"
              spacing={{ px: 20, pt: 20 }}
            >
              <Box direction="horizontal" gap={5}>
                <RNText variant="h5">My Reviews</RNText>
                <RNText variant="caption">({documentData.length}) </RNText>
              </Box>
              <RNText style={{ fontWeight: 'bold' }} color="primary">
                See All
              </RNText>
            </Box>
          </View>
        }
        contentContainerStyle={{ gap: 20, paddingBottom: 50 }}
        onEndReached={retrieveMore}
        onEndReachedThreshold={0}
        refreshing={refreshing}
      />
    </BackgoundContainer>
  );
};

export default Profile;
