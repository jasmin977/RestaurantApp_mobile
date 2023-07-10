import { FunctionComponent, useState, useRef } from 'react';
import { Animated, FlatList, TouchableOpacity, View } from 'react-native';

import { styled } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWidth } from '../containers/Backgound';
import { Restaurant } from '../../../entities';
import Review from '../review/Review';
import { Box, RNIcon, RNText } from '../../themed';
import { useTheme } from '../../../hooks';
import { HomeNavigationProps } from '../../../navigators/stacks/Home';
import { LikeIcon } from '../../../assets';
import { LinearGradient } from 'expo-linear-gradient';

interface CarouselProps {
  index: number;
  item: Restaurant;
  cardWidth?: number;
  onPress?: () => void;
}
const RestaurantHomeCard = ({ cardWidth = 0.7, onPress, index, item }: CarouselProps) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [scrollViewWidth, setScrollViewWidth] = useState(0);

  const boxWidth = scrollViewWidth * cardWidth;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const navigation = useNavigation<HomeNavigationProps['navigation']>();

  const { theme } = useTheme();
  const RestoImageBackground = styled.ImageBackground`
    height: 400px;
    width: ${boxWidth}px;
  `;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View
        style={{
          transform: [
            {
              scale: pan.x.interpolate({
                inputRange: [
                  (index - 1) * boxWidth - halfBoxDistance,
                  index * boxWidth - halfBoxDistance,
                  (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
                ],
                outputRange: [0.8, 1, 0.8], // scale down when out of scope
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        <RestoImageBackground imageStyle={{ borderRadius: 20 }} source={item.img}>
          <Box direction="horizontal" justifyContent="space-between" spacing={{ p: 10 }}>
            <Review
              rating={item.rating}
              additinalStyle={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 100,

                paddingHorizontal: 10,
              }}
            />
            <Box bg="background" spacing={{ p: 10 }} rounded={50}>
              <RNIcon size={25} color="primary" as={<LikeIcon />} />
            </Box>
          </Box>
          <LinearGradient
            style={{
              bottom: 0,
              position: 'absolute',
              width: '100%',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
            colors={['transparent', 'black']}
          >
            <Box alignItems="flex-start" gap={10} spacing={{ pt: 20 }}>
              <RNText variant="h2">{item.name}</RNText>
              <RNText>Friends went here</RNText>
            </Box>
          </LinearGradient>
        </RestoImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RestaurantHomeCard;
