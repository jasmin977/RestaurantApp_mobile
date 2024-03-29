import { Animated, ImageBackground } from 'react-native';
import { HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE } from './Constants';

export const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);

export const getHeaderTranslateY = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE * 2],
    extrapolate: 'clamp',
  });
};

export const getImageTranslateY = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });
};

export const getDetailsTranslateY = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE * 3],
    outputRange: [0, -HEADER_SCROLL_DISTANCE / 2, -HEADER_MAX_HEIGHT * 3],
    extrapolate: 'clamp',
  });
};

export const getTitleOpacity = (scrollY: Animated.Value) => {
  return scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
};
