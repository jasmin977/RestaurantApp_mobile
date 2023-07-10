import { Animated, FlatList, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { Restaurant } from '../../entities';
import { Box, RNIcon, RNText } from '../themed';
import { styled } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Review } from '../common';
import { LikeIcon } from '../../assets';

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

  const RestoImageBackground = styled.ImageBackground`
    height: 400px;
    width: ${boxWidth}px;
  `;

  const renderItem = ({ item, index }: { item: Restaurant; index: number }) => (
    <TouchableOpacity>
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

  return (
    <FlatList
      horizontal
      data={data}
      style={{}}
      contentContainerStyle={{ paddingVertical: 5 }}
      contentInsetAdjustmentBehavior="never" // ensures that the list doesn't automatically adjust its content insets
      snapToAlignment="center" //Sets the alignment of the snapped item during scrolling
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
  );
};

export default Carousel;
