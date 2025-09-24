import React, { useMemo, useRef, useCallback, Suspense } from 'react';
import { View, ScrollView, StatusBar, StyleSheet, ImageBackground, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../../navigators/stacks';
import { Box, RNButton, RNText, RNToast } from '../../components/themed';
import { BackButton, BackgoundContainer, Loader } from '../../components/common';
import LottieView from 'lottie-react-native';
import { scale, verticalScale } from '../../helpers';
import assets from '../../assets';
import { useAppState, useAuth, useReviewContext, useTheme } from '../../context';
import { RestaurantService, ReviewService } from '../../service';
import BottomSheet from '@gorhom/bottom-sheet';
import CenteredContainer from '../../components/common/containers/Centered';
import { ScreenWidth } from '../../components/common/containers/Backgound';
import { LikeButton, RatingStars, ReviewForm } from './components';
import RestaurantDetails from './components/sections/RestaurantDetails';
import VisitedBy from './components/sections/VisitedBy';
import { LazyMenuSection, LazyReviwSection, LocationMap } from './components/SuspenseComponents';
import {
  getDetailsTranslateY,
  getHeaderTranslateY,
  getImageTranslateY,
  getTitleOpacity,
} from './components/AnimatedComponents';
import { BASE_URL } from '../../CONSTANTS';

type Props = NativeStackScreenProps<RestaurantStackParamList, 'RestaurantProfile'>;
const HEADER_MAX_HEIGHT = verticalScale(240);

const RestaurantProfileScreen = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const { token } = useAuth();

  const scrollY = useRef(new Animated.Value(0)).current;
  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    error: restaurantError,
  } = RestaurantService.useFetchRestaurantByID(id, token);

  const { isToastVisible } = useAppState();
  const { theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '90%'], []);
  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  if (restaurantLoading) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <Loader size={200} />
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  if (restaurantError) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>error..</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  const hasrestaurantData = !!restaurantData?.data.restaurant;

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
  const restaurant = restaurantData?.data.restaurant;

  const coordinate = {
    latitude: restaurant.latitude,
    longitude: restaurant.longitude,
  };
  const AnimetedImage = Animated.createAnimatedComponent(ImageBackground);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
          }}
        >
          <Box h={HEADER_MAX_HEIGHT / 1.5} />

          <View style={{ flex: 1, paddingTop: 40 }}>
            <Suspense
              fallback={
                <Box spacing={{ py: 30 }}>
                  <RNText>Menu...</RNText>
                </Box>
              }
            >
              <LazyMenuSection menu={restaurantData.data.restaurant.menu_categories} />
            </Suspense>
            <Suspense
              fallback={
                <Box spacing={{ py: 30 }}>
                  <RNText>Reviews...</RNText>
                </Box>
              }
            >
              <LazyReviwSection
                restaurantId={restaurant.id}
                overallRating={restaurant.overallRating}
                totalReviews={restaurant.totalReviews}
                starRatingPercentages={restaurant.starRatingPercentages}
                navigation={navigation}
              />
            </Suspense>
            <Suspense
              fallback={
                <Box spacing={{ py: 30 }}>
                  <RNText>Map...</RNText>
                </Box>
              }
            >
              <LocationMap location={coordinate} />
            </Suspense>
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.background,
            transform: [{ translateY: getHeaderTranslateY(scrollY) }],
          },
        ]}
      >
        <AnimetedImage
          imageStyle={{ borderRadius: scale(30) }}
          style={[
            styles.headerBackground,

            {
              transform: [{ translateY: getImageTranslateY(scrollY) }],
            },
          ]}
          source={{
            uri: `http://${BASE_URL}:8000/storage/${restaurantData.data.restaurant.imageUrl}`,
          }}
        >
          <VisitedBy />
        </AnimetedImage>
      </Animated.View>

      {/** tob bar */}
      <Animated.View
        style={[
          styles.titlenavBar,
          {
            opacity: getTitleOpacity(scrollY),
            backgroundColor: theme.colors.background,
          },
        ]}
      >
        <RNText variant="h4"> {restaurantData.data.restaurant.name}</RNText>
        <RatingStars
          rating={Math.ceil(restaurantData.data.restaurant.overallRating)}
          allStar
          size={18}
        />
      </Animated.View>

      <View style={styles.navBar}>
        <BackButton onPress={() => navigation.goBack()} />

        <LikeButton />
      </View>

      {/** restaurant details box */}
      <Animated.View
        style={[
          styles.topBar,
          {
            transform: [{ translateY: getDetailsTranslateY(scrollY) }],
          },
        ]}
      >
        <RestaurantDetails data={restaurant} />
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
        <ReviewForm restaurantId={restaurant.id} handleSnapPress={handleSnapPress} />
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
  titlenavBar: {
    paddingTop: StatusBar.currentHeight,
    width: '100%',
    zIndex: 1,

    alignItems: 'center',
    position: 'absolute',
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
