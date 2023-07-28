import { Animated, FlatList, TouchableOpacity, View, ImageBackground } from 'react-native';

import React from 'react';
import { Restaurant } from '../../entities';
import { Avatar, AvatarGroup, Box, RNIcon, RNText } from '../themed';
import { styled } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Review } from '../common';
import { AVATAR, LikeIcon } from '../../assets';
import { RootNavigationProps } from '../../navigators/ROUTES';
import { useNavigation } from '@react-navigation/native';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from '../../helpers';

interface CarouselProps {
  data: Array<Restaurant>;
  cardWidth?: number;
}

const Carousel = ({ cardWidth = 0.7, data }: CarouselProps) => {
  const pan = React.useRef(new Animated.ValueXY()).current;
  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);

  const boxWidth = scrollViewWidth * cardWidth;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;

  const navigation = useNavigation<RootNavigationProps['navigation']>();

  const renderItem = ({ item, index }: { item: Restaurant; index: number }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.push('RestaurantStack', {
          screen: 'RestaurantProfile',
          params: {
            id: item.id,
          },
        });
      }}
    >
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
        <ImageBackground
          style={{ height: verticalScale(400), width: scale(250) }}
          imageStyle={{ borderRadius: scale(20) }}
          source={{
            uri: item.img,
          }}
        >
          <Box direction="horizontal" justifyContent="space-between" spacing={{ p: 10 }}>
            <Review
              rating={item.rating}
              additinalStyle={{
                backgroundColor: 'rgba(255,255,255,0.7)',
                borderRadius: 100,
                paddingVertical: 5,
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
              paddingVertical: moderateVerticalScale(10),
              paddingHorizontal: moderateScale(20),
              borderBottomLeftRadius: scale(20),
              borderBottomRightRadius: scale(20),
            }}
            colors={['transparent', 'black']}
          >
            <Box alignItems="flex-start" gap={10} spacing={{ py: 20 }}>
              <RNText color="white" variant="h3">
                {item.name}
              </RNText>
              <RNText color="white">Friends were here</RNText>
              <AvatarGroup size={35} max={3}>
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
              </AvatarGroup>
            </Box>
          </LinearGradient>
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Box
        direction="horizontal"
        w={'100%'}
        justifyContent="space-between"
        spacing={{ px: 20, py: 20 }}
      >
        <RNText color="onBackground" variant="h5">
          Best Restaurants
        </RNText>
        <RNText color="primary" variant="caption" style={{ fontWeight: 'bold' }}>
          View All
        </RNText>
      </Box>
      <FlatList
        horizontal
        data={data}
        contentContainerStyle={{ paddingVertical: 5, paddingHorizontal: 20 }}
        contentInsetAdjustmentBehavior="never" // ensures that the list doesn't automatically adjust its content insets
        snapToAlignment="start" //Sets the alignment of the snapped item during scrolling
        decelerationRate="fast" //Controls the speed at which the scrolling decelerates after the user lifts their finger
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        snapToInterval={boxWidth} // Sets the interval at which the list snaps to the nearest item during scrolling, based on the boxWidth.
        contentInset={{
          left: halfBoxDistance,
          right: halfBoxDistance,
        }}
        contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
        onLayout={e => {
          setScrollViewWidth(e.nativeEvent.layout.width);
        }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: pan.x } } }], {
          useNativeDriver: false,
        })}
        keyExtractor={(item, index) => `${index}_${item.name}`}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Carousel;
