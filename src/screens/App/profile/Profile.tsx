import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../../../context';
import { Review } from '../../../entities';
import { usePagination } from '../../../hooks';
import { ReviewService } from '../../../service';
import { Box, RNButton, RNIcon, RNText } from '../../../components/themed';
import { BackButton, BackgoundContainer } from '../../../components/common';
import { EditIcon } from '../../../assets';
import ReviewCard from './../home/components/ReviewCard';
import ProfileHeader from './components/ProfileHeader';
import ProfileFooter from './components/ProfileFooter';
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

  const { loadPage, data, isLoading } = usePagination(ReviewService.useFetchReviewByPage);

  const userData = getUserData(route.params?.id, user);

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

      {userData && (
        <FlatList
          data={data}
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
          ListFooterComponent={<ProfileFooter isLoading={isLoading} />}
          contentContainerStyle={{ gap: 20, paddingBottom: 50 }}
          onEndReached={loadPage}
          onEndReachedThreshold={0}
        />
      )}

      {!userData && (
        <BackgoundContainer>
          <CenteredContainer>
            <RNText>No profile available</RNText>
          </CenteredContainer>
        </BackgoundContainer>
      )}
    </BackgoundContainer>
  );
};

export default Profile;
