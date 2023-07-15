import { FunctionComponent } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { BackgoundContainer, CenteredView } from '../../components/common';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';
import { AVATAR, BackIcon, EditIcon } from '../../assets';
import { RootStackParamList } from '../../navigators/ROUTES';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../context';
import { RESTAURANTS } from '../../data';
import ReviewCard from './componnets/ReviewCard';
import { Restaurant } from '../../entities';

interface ProfileProps {}
type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;
const Profile = ({ navigation }: Props) => {
  const { theme } = useTheme();
  return (
    <BackgoundContainer>
      <ScrollView stickyHeaderIndices={[0, 2]}>
        <Box
          bg="background"
          direction="horizontal"
          justifyContent="space-between"
          spacing={{ px: 20, py: 10 }}
        >
          <RNButton
            size="sm"
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
            onPress={() => navigation.goBack()}
            centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
          />
          <RNText variant="subtitle">Profile</RNText>
          <RNButton
            color="secondary"
            size="sm"
            onPress={() => navigation.navigate('EditProfile')}
            centerIcon={<RNIcon color="onCard" as={<EditIcon />} />}
          />
        </Box>
        <View style={{ paddingVertical: 10 }}>
          <Box gap={10}>
            <Image source={AVATAR} style={{ width: 100, height: 100, borderRadius: 100 }} />
            <RNText variant="h4">Yasmin b.Abdeljelil</RNText>
            <RNText align="center" variant="caption">
              Msaken,sousse
            </RNText>
            <RNText align="center" variant="subtitle">
              I'm a positive person.iLove to travel an eat. Always availble for chat.
            </RNText>
          </Box>
          <Box direction="horizontal" spacing={{ py: 20 }}>
            <RNButton
              size="md"
              color="primary"
              title="Follow"
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
        </View>
        <Box
          bg="background"
          direction="horizontal"
          justifyContent="space-between"
          spacing={{ px: 20, py: 20 }}
        >
          <Box direction="horizontal" gap={5}>
            <RNText variant="h5">My Reviews</RNText>
            <RNText variant="caption">(602) </RNText>
          </Box>
          <RNText style={{ fontWeight: 'bold' }} color="primary">
            See All
          </RNText>
        </Box>
        <View style={{ gap: 20, paddingBottom: 20 }}>
          {RESTAURANTS.map((item: Restaurant) => (
            <ReviewCard key={`key_${item.id}_ `} {...item} />
          ))}
        </View>
      </ScrollView>
    </BackgoundContainer>
  );
};

export default Profile;
