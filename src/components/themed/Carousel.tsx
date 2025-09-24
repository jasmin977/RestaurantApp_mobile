import { Animated, FlatList, View } from 'react-native';
import React from 'react';

import { RootNavigationProps, RootStackParamList } from '../../navigators/ROUTES';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface CarouselProps<T> {
  data: Array<T>;
  cardWidth?: number;
  onPress?: (data: any) => void;
  renderItem: ({
    item,
    onPress,
    index,
    boxWidth,
    pan,
    halfBoxDistance,
    navigation,
  }: {
    item: T;
    onPress?: (data: any) => void;
    index: number;
    boxWidth: number;
    pan: Animated.ValueXY;
    halfBoxDistance: number;
    navigation: NativeStackNavigationProp<RootStackParamList>;
  }) => JSX.Element;
}

const Carousel = <T extends {}>({
  cardWidth = 0.7,
  data,
  renderItem,
  onPress,
}: CarouselProps<T>) => {
  const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
  const pan = React.useRef(new Animated.ValueXY()).current;

  const boxWidth = scrollViewWidth * cardWidth;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;

  const navigation = useNavigation<RootNavigationProps['navigation']>();

  return (
    <View>
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
        keyExtractor={(item, index) => `CAROUSEL_${boxWidth}_${index}_${item.toString()}`}
        renderItem={({ item, index }) =>
          renderItem({ item, index, boxWidth, pan, halfBoxDistance, navigation, onPress })
        }
      />
    </View>
  );
};

export default Carousel;
