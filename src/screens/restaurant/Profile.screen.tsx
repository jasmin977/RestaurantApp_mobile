import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo, useRef, useCallback } from 'react';
import assets from '../../assets';
import { BackButton, BackgoundContainer, Loader } from '../../components/common';
import { useAppState, useReviewContext, useTheme } from '../../context';
import { Box, RNButton, RNText, RNToast } from '../../components/themed';
import { RestaurantStackParamList } from '../../navigators/stacks';
import { LikeButton, LocationMap, MenuSection, RatingStars, ReviewForm } from './components';
import { View, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { RestaurantService, ReviewService } from '../../service';
import CenteredContainer from '../../components/common/containers/Centered';
import LottieView from 'lottie-react-native';
import { scale, verticalScale } from '../../helpers';
import { StatusBar, StyleSheet, ImageBackground, Animated } from 'react-native';
import RestaurantDetails from './components/sections/RestaurantDetails';
import RestaurantRatingAndReviews from './components/sections/RestaurantRatingAndReviews';
import { ScreenWidth } from '../../components/common/containers/Backgound';
import VisitedBy from './components/sections/VisitedBy';
type Props = NativeStackScreenProps<RestaurantStackParamList, 'RestaurantProfile'>;
const HEADER_MAX_HEIGHT = verticalScale(240);
const HEADER_MIN_HEIGHT = verticalScale(95);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const RestaurantProfileScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;
  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = RestaurantService.useFetchRestaurantByID(id);
  const {
    data: reviwData,
    isLoading: reviwLoading,
    error: reviwError,
  } = ReviewService.useFetchReviewsByRestaurantId(id);
  const { reviewsByRestaurantId } = useReviewContext();
  const { isToastVisible } = useAppState();
  const { theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '90%'], []);
  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  if (restaurantLoading || reviwLoading) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <Loader size={200} />
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  if (restaurantError || reviwError) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>error..</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  const hasReviewsData = !!reviwData?.data;
  const hasrestaurantData = !!restaurantData?.data;

  if (!hasrestaurantData) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <BackButton onPress={() => navigation.goBack()} />
          <LottieView
            autoPlay
            loop
            style={{
              width: scale(100),
              height: verticalScale(100),
            }}
            source={assets.lottieFiles.SearchNotFound}
          />
          <RNText variant="body">Restaurant not found.</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

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
  const detailsTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE * 3],
    outputRange: [0, -HEADER_SCROLL_DISTANCE / 2, -HEADER_MAX_HEIGHT * 3],
    extrapolate: 'clamp',
  });
  const topBarBGcolor = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: ['transparent', theme.colors.background],
    extrapolate: 'clamp',
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const headerStyle = [
    styles.header,
    {
      backgroundColor: theme.colors.background,
    },
  ];
  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);
  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
          }}
        >
          <Box h={HEADER_MAX_HEIGHT / 1.5}></Box>
          <View style={{ flex: 1, paddingTop: 40 }}>
            <MenuSection menu={restaurantData.data.menu} />
            <RestaurantRatingAndReviews data={reviewsByRestaurantId} navigation={navigation} />
            <LocationMap location={restaurantData.data.coordinate} />
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View style={[headerStyle, { transform: [{ translateY: headerTranslateY }] }]}>
        <AnimetedImage
          imageStyle={{ borderRadius: scale(30) }}
          style={[
            styles.headerBackground,

            {
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            },
          ]}
          source={{ uri: restaurantData.data.img }}
        >
          <VisitedBy />
        </AnimetedImage>
      </Animated.View>

      {/** tob bar */}
      <Animated.View
        style={[
          styles.navBar,
          {
            backgroundColor: topBarBGcolor,
          },
        ]}
      >
        <BackButton onPress={() => navigation.goBack()} />
        <Animated.View style={{ opacity: titleOpacity }}>
          <RNText variant="h4"> {restaurantData.data.name}</RNText>
        </Animated.View>
        <LikeButton />
      </Animated.View>

      {/** restaurant details box */}
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ translateY: detailsTranslateY }],
          },
        ]}
      >
        <RestaurantDetails data={restaurantData.data} />
      </Animated.View>

      {isToastVisible && (
        <Box
          style={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
          }}
        >
          <RNToast title="liked" duration={2000} />
        </Box>
      )}
      <Box
        spacing={{ p: 10 }}
        bg="background"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <RNButton
          onPress={() => handleSnapPress(1)}
          style={{ width: '100%' }}
          title="Leave a review"
        />
      </Box>

      <BottomSheet
        backgroundStyle={{ backgroundColor: theme.colors.card }}
        enablePanDownToClose
        enableOverDrag
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
      >
        <ReviewForm restaurant={restaurantData.data} handleSnapPress={handleSnapPress} />
      </BottomSheet>
    </View>
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
    overflow: 'scroll',
    height: HEADER_MAX_HEIGHT,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: ScreenWidth,
    height: HEADER_MAX_HEIGHT,
    borderBottomRightRadius: scale(30),
    borderBottomLeftRadius: scale(30),
    resizeMode: 'cover',
  },
  navBar: {
    zIndex: 1,

    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 20,
  },
  topBar: {
    marginTop: StatusBar.currentHeight,

    flex: 1,
    //zIndex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: HEADER_MAX_HEIGHT / 2,
    left: 0,
    right: 0,
  },
});
export default RestaurantProfileScreen;
