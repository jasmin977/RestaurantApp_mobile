import { AVATAR, rest_1 } from '../../assets';
import { BackgoundContainer } from '../../components/common';
import { ScreenWidth } from '../../components/common/containers/Backgound';
import { Box, RNText } from '../../components/themed';
import React, { ReactNode, useRef } from 'react';
import { SafeAreaView, StyleSheet, Image, ImageSourcePropType, Text, Animated } from 'react-native';
import { useTheme } from '../../hooks';

interface animatedHeaderProp {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title?: string;
  backgroundImage: ImageSourcePropType;
}
const HEADER_MAX_HEIGHT = 240;
const HEADER_MIN_HEIGHT = 84;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const AnimatdeHeader: React.FC<animatedHeaderProp> = ({
  children,
  backgroundImage,
  title,
  leftIcon,
  rightIcon,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current; // our animated value

  // our header y-axis animated from 0 to HEADER_SCROLL_DISTANCE,
  // we move our element for -HEADER_SCROLL_DISTANCE at the same time.
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  // our opacity animated from 0 to 1 and our opacity will be 0
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  // change header title size from 1 to 0.9
  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.9],
    extrapolate: 'clamp',
  });
  // change header title y-axis
  const titleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, -8],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });
  const { theme } = useTheme();
  const headerStyle = [
    styles.header,
    {
      backgroundColor: theme.colors.background,
    },
  ];
  return (
    <BackgoundContainer>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT - 32 }}
        scrollEventThrottle={16} //
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }], // event.nativeEvent.contentOffset.x to scrollX
          { useNativeDriver: true } // use native driver for animation
        )}
      >
        {children}
      </Animated.ScrollView>
      <Animated.View style={[headerStyle, { transform: [{ translateY: headerTranslateY }] }]}>
        <Animated.Image
          style={[
            styles.headerBackground,
            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
          source={backgroundImage}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ scale: titleScale }, { translateY: titleTranslateY }],
          },
        ]}
      >
        {leftIcon}
        <Animated.View style={{ opacity: titleOpacity }}>
          <RNText variant="h5">{title}</RNText>
        </Animated.View>
        {rightIcon}
      </Animated.View>
    </BackgoundContainer>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: ScreenWidth,
    height: HEADER_MAX_HEIGHT,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    resizeMode: 'cover',
  },
  topBar: {
    flexDirection: 'row',
    marginTop: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 10,
    right: 10,
  },
});

export default AnimatdeHeader;
