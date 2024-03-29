import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useAuth } from '../../../context';
import { Review } from '../../../entities';

import { BackButton, BackgoundContainer, Loader, ReviewCard } from '../../../components/common';
import { Box } from '../../../components/themed';

import CenteredContainer from '../../../components/common/containers/Centered';
import { RootStackParamList } from '../../../navigators/ROUTES';
import UserService from '../../../service/Users';
import ProfileHeader from './components/ProfileHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile: React.FC<Props> = ({ route, navigation }) => {
  const { id: userId } = route.params || {};
  const { user } = useAuth();
  const { data: userData, isLoading, isFetching, refetch } = UserService.useFetchUserByID(userId);
  console.log('🚀 ~ file: Profile.tsx:21 ~ userData:', userData?.data);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('🚀 ~ file: Profile  refetch:');
      refetch();
    });
    return () => {
      unsubscribe();
    };
  }, [navigation]);
  useEffect(() => {
    refetch();
  }, [user]);

  if (!userData) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <Loader size={200} />
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
      </Box>

      {userData?.data && (
        <FlatList
          data={userData.data.user.reviews}
          renderItem={({ item }: { item: Review }) => <ReviewCard {...item} />}
          keyExtractor={(item, index) => `Profile_${item.id}_${item.created_at}_${index}`}
          ListHeaderComponent={
            <ProfileHeader userId={userData.data.user.id} navigation={navigation} />
          }
          contentContainerStyle={{ gap: 20, paddingBottom: 50 }}
          onEndReachedThreshold={100}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
        />
      )}
    </BackgoundContainer>
  );
};

export default Profile;
