import { View, Animated, StyleSheet } from 'react-native';
import React, { useRef, useState, ReactNode } from 'react';

import { SafeAreaView, NativeScrollEvent, FlatList, StatusBar } from 'react-native';

import { Box, RNButton, RNIcon, RNText } from '../themed';

import { useAuth, useTheme } from '../../context';
import { RESTAURANTS } from '../../data';
import { RestaurantItem } from '../common';
import { FilterIcon, MenuIcon, SearchIcon } from '../../assets';

const { diffClamp } = Animated;
const headerHeight = 100 * 2;

interface AnimatedHeaderProps<T> {
  header: ReactNode;
  ListHeaderComponent?: ReactNode;
  data?: [];
  renderItem?: ReactNode;
}

const AnimatedHeader = <T,>({
  header,
  ListHeaderComponent,
  renderItem,
  data,
}: AnimatedHeaderProps<T>) => {
  const { isDarkTheme } = useTheme();
  const refList = useRef<FlatList<any> | null>(null);
  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
  const translateYNumber = useRef<number>(0);

  const translateOpacity = scrollYClamped.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight / 2)],
  });

  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );

  const getCloser = (value: number, checkOne: number, checkTwo: number): number =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

  const handleSnap = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }): void => {
    const offsetY = nativeEvent.contentOffset.y;
    if (!(translateYNumber.current === 0 || translateYNumber.current === -headerHeight / 2)) {
      if (refList.current) {
        refList.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -headerHeight / 2, 0) === -headerHeight / 2
              ? offsetY + headerHeight / 2
              : offsetY - headerHeight / 2,
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
        <View
          style={[
            {
              height: headerHeight,
            },
          ]}
        >
          {header}
        </View>
      </Animated.View>
      <Animated.FlatList
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: headerHeight, gap: 20 }}
        ListHeaderComponent={ListHeaderComponent as React.ReactElement<any>}
        onScroll={handleScroll}
        ref={refList}
        onMomentumScrollEnd={handleSnap}
        data={RESTAURANTS}
        renderItem={({ item }) => <RestaurantItem key={`key_${item.id}_ `} {...item} />}
        keyExtractor={(_, index) => `list-item-${index}`}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'absolute',

    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },

  container: {
    flex: 1,
  },
});

export default AnimatedHeader;
