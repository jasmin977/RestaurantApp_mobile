import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../../context';
import { Review, user } from '../../../entities';

import { ReviewService } from '../../../service';
import { Box, RNText } from '../../../components/themed';
import { BackButton, BackgoundContainer, ReviewCard } from '../../../components/common';

import ProfileHeader from './components/ProfileHeader';
import { RootStackParamList } from '../../../navigators/ROUTES';
import { getUserData } from '../../../helpers';
import CenteredContainer from '../../../components/common/containers/Centered';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile: React.FC<Props> = ({ route, navigation }) => {
  const [isFollow, setIsFollow] = useState(false);
  const { user } = useAuth();

  const handleToggleFollow = () => {
    setIsFollow(prevIsFollow => !prevIsFollow);
  };

  const userData = getUserData(route.params?.id, user);

  const {
    data: userReviews,
    isLoading: reviewLoading,
    error: reviewError,
  } = ReviewService.useFetchReviewsByUserId(userData?.id ?? 1);

  if (userData === null) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>loading.. </RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }
  if (reviewLoading) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>loading reviews.. </RNText>
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

      <FlatList
        data={userReviews.data}
        renderItem={({ item }: { item: Review }) => <ReviewCard {...item} />}
        keyExtractor={(item, index) => `Profile_${item.id}_${item.reviewedAt}_${index}`}
        ListHeaderComponent={
          <ProfileHeader
            userData={userData}
            isFollow={isFollow}
            onToggleFollow={handleToggleFollow}
            navigation={navigation}
          />
        }
        contentContainerStyle={{ gap: 20, paddingBottom: 50 }}
        onEndReachedThreshold={100}
      />
    </BackgoundContainer>
  );
};

export default Profile;
