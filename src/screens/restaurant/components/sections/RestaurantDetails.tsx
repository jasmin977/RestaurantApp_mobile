import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ClockIcon, Delivery, LocationIcon } from '../../../../assets';

import { Avatar, Box, RNIcon, RNText } from '../../../../components/themed';
import { useTheme } from '../../../../context';
import { Restaurant } from '../../../../entities';
import { RestaurantStackParamList } from '../../../../navigators/stacks';
import RatingStars from '../reviews/RatingStars';
import { scale } from '../../../../helpers';

interface RestaurantDetailsProps {
  data: Restaurant;
  navigation?: NativeStackNavigationProp<RestaurantStackParamList, 'RestaurantProfile'>;
}

const RestaurantDetails = ({ data, navigation }: RestaurantDetailsProps) => {
  return (
    <Box
      w={'90%'}
      bg="card"
      rounded={30}
      style={{ zIndex: 1 }}
      spacing={{ px: 20, py: 20 }}
      alignItems="flex-start"
      gap={15}
    >
      <Box direction="horizontal" gap={15}>
        <Box flex={1}>
          <Avatar src={data.logo} size={55} />
        </Box>

        <Box alignItems="flex-start" flex={6}>
          <RNText variant="h4">{data.name}</RNText>
          <Box direction="horizontal" gap={5}>
            <RNIcon color="primary" as={<LocationIcon outline={false} />} />
            <RNText>{data.location}</RNText>
          </Box>
        </Box>
      </Box>
      <Box direction="horizontal" gap={10} style={{ flexWrap: 'wrap' }} justifyContent="flex-start">
        {data.tags.map((item: string) => (
          <Box bg="background" spacing={{ p: 5, px: 10 }} rounded={10} key={item}>
            <RNText>{item.trim()}</RNText>
          </Box>
        ))}
      </Box>

      <Box direction="horizontal" w={'100%'} justifyContent="space-between">
        <Box direction="horizontal" gap={10}>
          <RNIcon size={20} as={<ClockIcon outline={false} />} color="primary" />

          <RNText variant="subtitle" style={{ fontSize: scale(14) }}>
            {data.workingTime}
          </RNText>
        </Box>
        <Box direction="horizontal" gap={10}>
          <RNIcon size={20} as={<Delivery />} color="primary" />

          <RNText variant="subtitle" style={{ fontSize: scale(14) }}>
            Free Delivery
          </RNText>
        </Box>
      </Box>
      <RatingStars rating={data.rating} size={20} />
    </Box>
  );
};

export default RestaurantDetails;
