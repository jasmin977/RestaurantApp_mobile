import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClockIcon, LocationIcon } from '../../../../assets';

import { Box, RNIcon, RNText } from '../../../../components/themed';
import { useTheme } from '../../../../context';
import { Restaurant } from '../../../../entities';
import LikeButton from '../buttons/LikeButton';
import MenuSection from './MenuSection';
import { RestaurantStackParamList } from '../../../../navigators/stacks';

import RatingStars from '../reviews/RatingStars';

interface RestaurantDetailsProps {
  data: Restaurant;
  navigation: NativeStackNavigationProp<RestaurantStackParamList, 'RestaurantProfile'>;
}

const RestaurantDetails = ({ data, navigation }: RestaurantDetailsProps) => {
  const { theme } = useTheme();

  return (
    <Box bg="background" spacing={{ p: 20 }} flex={1} gap={25} w={'100%'} alignItems="flex-start">
      <Box flex={1} w={'100%'} direction="horizontal" justifyContent="space-between">
        <Box flex={1} alignItems="flex-start">
          <RNText variant="h3">{data.name}</RNText>
          <Box direction="horizontal" gap={5}>
            <RNIcon outline as={<LocationIcon />} />
            <RNText>{data.location}</RNText>
          </Box>
        </Box>
        <LikeButton />
      </Box>
      <Box alignItems="flex-start" onPress={() => navigation.navigate('RestaurantReviews')}>
        <RatingStars rating={data.rating} detailed size={20} />
      </Box>
      <Box direction="horizontal" gap={10}>
        <RNIcon as={<ClockIcon />} outline color="primary" />

        <RNText variant="h5">Opened Now</RNText>
        <RNText>{data.workingTime}</RNText>
      </Box>
      <RNText>{data.description}</RNText>

      <MenuSection menu={data.menu} />
    </Box>
  );
};

export default RestaurantDetails;
