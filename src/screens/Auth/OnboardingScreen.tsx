import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import assets, { BackIcon, ChevronRightIcon } from '../../assets';

import { useAuth, useTheme } from '../../context';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';

import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';
import { lightPalette } from '../../themes';

const screenWidth = Dimensions.get('window').width;

interface stepsProp {
  title: string;
  description: string;
  image: any;
}

const steps: stepsProp[] = [
  {
    title: 'Scan and Discover',
    description:
      'Unlock restaurant reviews and menu details by scanning QR codes. Explore ratings, reviews, and menu items.',
    image: assets.lottieFiles.ScannigMenu,
  },
  {
    title: 'Find Nearby Restaurants',
    description:
      'Discover restaurants near you on an interactive map. Explore their locations, reviews, and menus.',
    image: assets.lottieFiles.Map,
  },
  {
    title: 'Share Your Reviews',
    description:
      'Leave honest reviews and ratings for dishes you ve tried. Help others make informed choices. Be a trusted voice.',
    image: assets.lottieFiles.Review,
  },
];
const RenderItem = ({ item }: { item: stepsProp }) => {
  return (
    <Box
      gap={20}
      w={screenWidth}
      spacing={{ p: 20 }}
      style={{ backgroundColor: lightPalette.card }}
    >
      <LottieView
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
        }}
        source={item.image}
      />

      <RNText align="center" variant="h3" color="black">
        {item.title}
      </RNText>
      <RNText color="black" align="center">
        {item.description}
      </RNText>
    </Box>
  );
};
const OnboardingScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { markAppisInitialized } = useAuth();

  const handleNextStep = () => {
    if (currentIndex === 2) {
      markAppisInitialized();
    }
    const nextIndex = currentIndex === 0 ? 1 : 2;
    setCurrentIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const handlePreviousStep = () => {
    const previousIndex = currentIndex === 0 ? 0 : currentIndex - 1;
    setCurrentIndex(previousIndex);
    flatListRef.current?.scrollToIndex({ index: previousIndex, animated: true });
  };

  const handleSkipStep = () => {
    markAppisInitialized();
  };

  return (
    <Box style={{ backgroundColor: lightPalette.card }} flex={1}>
      <StatusBar style={'dark'} />

      <FlatList
        ref={flatListRef}
        data={steps}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        renderItem={RenderItem}
      />
      {currentIndex !== 0 && (
        <RNButton
          size="sm"
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            position: 'absolute',
            top: 60,
            left: 20,
          }}
          onPress={handlePreviousStep}
          centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
        />
      )}
      {currentIndex === 2 ? (
        <RNButton
          variant="solid"
          onPress={handleSkipStep}
          title="Get started"
          style={{ marginBottom: 60, shadowColor: lightPalette.primary, elevation: 20 }}
        />
      ) : (
        <Box direction="horizontal" justifyContent="space-around" w={'100%'} spacing={{ pb: 60 }}>
          <RNButton
            onPress={handleSkipStep}
            size="sm"
            title="Skip"
            variant="outline"
            color="secondary"
          />

          <RNButton
            onPress={handleNextStep}
            size="sm"
            style={{ shadowColor: lightPalette.primary, elevation: 20 }}
            centerIcon={<RNIcon color="white" outline as={<ChevronRightIcon />} />}
          />
        </Box>
      )}
    </Box>
  );
};

export default OnboardingScreen;
