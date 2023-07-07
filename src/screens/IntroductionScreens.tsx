import React, { useContext, useRef, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageSourcePropType,
  StyleSheet,
  Image,
} from 'react-native';
import { BackIcon, NextIcon, ReviewGif, ScanGif } from '../assets';
import { BackgoundContainer } from '../components/common';
import CenteredContainer from '../components/common/containers/Centered';
import { useTheme } from '../hooks';
import { RNButton, RNIcon, RNText } from '../components/themed';
import { InitialContext } from '../context';

const screenWidth = Dimensions.get('window').width;

const StepsScreen = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { markAppAsInitialized } = useContext(InitialContext);

  const handleNextStep = () => {
    if (currentIndex === 2) {
      markAppAsInitialized();
    }
    const nextIndex = currentIndex === 0 ? 1 : 2;
    setCurrentIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const handleSkipStep = () => {
    markAppAsInitialized();
  };

  interface stepsProp {
    title: string;
    description: string;
    image: ImageSourcePropType;
  }

  const steps: stepsProp[] = [
    {
      title: 'Scan and Discover',
      description:
        'Unlock restaurant reviews and menu details by scanning QR codes. Explore ratings, reviews, and menu items.',
      image: ScanGif,
    },
    {
      title: 'Find Nearby Restaurants',
      description:
        'Discover restaurants near you on an interactive map. Explore their locations, reviews, and menus.',
      image: ScanGif,
    },
    {
      title: 'Share Your Reviews',
      description:
        'Leave honest reviews and ratings for dishes you ve tried. Help others make informed choices. Be a trusted voice.',
      image: ReviewGif,
    },
  ];
  const RenderItem = ({ item }: { item: stepsProp }) => {
    return (
      <View
        style={{
          width: screenWidth,
          gap: 20,
          alignItems: 'center',
          padding: 20,
          justifyContent: 'center',
        }}
      >
        <Image source={item.image} style={{ width: 250, height: 250 }} />
        <RNText align="center" variant="h3">
          {item.title}
        </RNText>
        <RNText align="center">{item.description}</RNText>
      </View>
    );
  };

  const { theme } = useTheme();
  return (
    <CenteredContainer
      viewStyle={{
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <FlatList
        ref={flatListRef}
        data={steps}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        renderItem={RenderItem}
      />

      {currentIndex === 2 ? (
        <View
          style={{
            paddingBottom: 50,
          }}
        >
          <RNButton variant="solid" onPress={handleSkipStep} title="Get started" />
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 30,
            paddingBottom: 50,
          }}
        >
          <TouchableOpacity onPress={handleSkipStep}>
            <RNText align="center">Skip</RNText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
            onPress={handleNextStep}
          >
            <RNText align="center" variant="subtitle">
              Next
            </RNText>
            <RNIcon outline color="white" size={20} as={<NextIcon />} />
          </TouchableOpacity>
        </View>
      )}
    </CenteredContainer>
  );
};

export default StepsScreen;
