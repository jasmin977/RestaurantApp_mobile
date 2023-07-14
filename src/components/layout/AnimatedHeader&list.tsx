import { View, Animated, StyleSheet, Image } from 'react-native';
import React, { useRef, useState, ReactNode } from 'react';

import { SafeAreaView, NativeScrollEvent, FlatList, StatusBar } from 'react-native';

import { useAuth, useTheme } from '../../context';
import { RESTAURANTS } from '../../data';
import { RestaurantItem, ReviewCard } from '../common';
import { Box, RNButton, RNIcon, RNText } from '../themed';
import {
  AVATAR,
  Comment,
  FilterIcon,
  MenuIcon,
  SearchIcon,
  Share,
  ThumbDown,
  ThumbUp,
  vegyBurger,
} from '../../assets';
import Carousel from './Carousel';
import { RatingStars } from '../../screens/restaurant/components';
import FoodCategories from '../../screens/App/componnets/CategoriesList';

const { diffClamp } = Animated;
const headerHeight = 68 * 2;

interface AnimatedHeaderProps<T> {
  header?: ReactNode;
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
  const { user } = useAuth();
  const { theme } = useTheme();

  const refList = useRef<FlatList<any> | null>(null);
  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
  const translateYNumber = useRef<number>(0);

  const translateOpacity = scrollYClamped.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0, 0],
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

  const Categories = [];
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
          <Box bg="background">
            <Animated.View style={[styles.topHeader, { opacity: translateOpacity }]}>
              <RNIcon outline size={30} as={<MenuIcon />} />
              <Box alignItems="flex-start" spacing={{ pt: 20 }}>
                <RNText color="onBackground" variant="h4">
                  Hey {user?.username}!👋
                </RNText>
                <RNText color="onBackground" variant="caption">
                  Share your own experiences
                </RNText>
              </Box>
            </Animated.View>
            <Box direction="horizontal" spacing={{ px: 20, py: 10 }} gap={10}>
              <Box
                flex={1}
                bg="card"
                h={'100%'}
                justifyContent="flex-start"
                spacing={{ px: 10 }}
                rounded={8}
                direction="horizontal"
                gap={5}
              >
                <RNIcon outline as={<SearchIcon />} color="primary" />
                <RNText>search for restaurants</RNText>
              </Box>
              <RNButton
                size="sm"
                centerIcon={<RNIcon as={<FilterIcon />} outline={true} color="white" />}
                onPress={() => console.log('filter button pressed')}
              />
            </Box>
          </Box>
        </View>
      </Animated.View>

      <Animated.FlatList
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: headerHeight, gap: 20 }}
        ListHeaderComponent={
          <View>
            <FoodCategories />
            <Carousel data={RESTAURANTS} />
          </View>
        }
        // ListHeaderComponent={ListHeaderComponent as React.ReactElement<any>}
        onScroll={handleScroll}
        ref={refList}
        onMomentumScrollEnd={handleSnap}
        data={RESTAURANTS}
        renderItem={({ item }) => <ReviewCard key={`key_${item.id}_ `} {...item} />}
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
  topHeader: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  container: {
    flex: 1,
  },
});

export default AnimatedHeader;
