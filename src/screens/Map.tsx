import { FunctionComponent, useEffect, useState, useRef } from 'react';
import { BackgoundContainer, CenteredView } from '../components/common';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootBottomStackParamList } from '../navigators/RootStack';
import {
  Image,
  StyleSheet,
  Animated,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Box, RNButton, RNIcon, RNText } from '../components/themed';
import MapView, { Marker } from 'react-native-maps';
import { usePersmissions, useTheme } from '../hooks';
import * as Location from 'expo-location';
import { AVATAR, BackIcon, StarIcon } from '../assets';
import { RESTAURANTS, RESTAURANTS_LOCATION } from '../data';
import { ScreenWidth } from '../components/common/containers/Backgound';
import { Restaurant } from '../entities';
interface MapProps {}
const CARD_HEIGHT = 220;
const CARD_WIDTH = ScreenWidth * 0.8;

type Props = NativeStackScreenProps<RootBottomStackParamList, 'Map'>;
const Map: FunctionComponent<Props> = ({ navigation }) => {
  const { hasPermission: locationPermission, errorMsg } = usePersmissions('location');

  const [location, setLocation] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  //const [selectedRestaurantId, setSelectedRestaurantId] = useState<number>();
  const scrollViewRef = useRef<ScrollView>(null);
  const pan = useRef(new Animated.ValueXY()).current;
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState(RESTAURANTS[3]);

  const mapRef = useRef<MapView>(null);

  const boxWidth = scrollViewWidth * 0.8;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const { theme } = useTheme();
  useEffect(() => {
    if (locationPermission) {
      (async () => {
        // Corrected syntax
        let loc = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });

        const { latitude, longitude } = loc.coords;
        setLocation({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      })();
    }
  }, []);

  const mapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: theme.colors.background,
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#746855',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#242f3e',
        },
      ],
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: theme.colors.primary,
        },
      ],
    },
    // Add more style rules here based on your preferences
  ];

  if (!locationPermission) {
    return (
      <BackgoundContainer>
        <RNText>{errorMsg}</RNText>
      </BackgoundContainer>
    );
  }
  if (!location) {
    return (
      <BackgoundContainer>
        <RNText>no location</RNText>
      </BackgoundContainer>
    );
  }

  const renderItem = ({ item, index }: { item: Restaurant; index: number }) => (
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
      <Box
        h={150}
        w={boxWidth}
        rounded={20}
        bg="card"
        direction="horizontal"
        spacing={{ p: 20 }}
        gap={5}
      >
        <Image
          source={item.img}
          style={{ width: boxWidth * 0.5, height: '100%', borderRadius: 10 }}
          resizeMode="contain"
        />
        <Box alignItems="flex-start" w={boxWidth * 0.4}>
          <RNText variant="body">{item.name}</RNText>
          <RNText variant="caption">{item.location}</RNText>
          <Box direction="horizontal">
            <RNIcon size={15} color="primary" as={<StarIcon />} />
            <RNText spacing={{ pl: 10 }} variant="body">
              {item.rating.toFixed(1)} out of 5
            </RNText>
          </Box>
        </Box>
      </Box>
    </Animated.View>
  );

  const selectedRestaurantCoordinate = RESTAURANTS_LOCATION.find(
    loc => loc.id === selectedRestaurant.id
  )?.coordinate;
  return (
    <BackgoundContainer>
      <RNButton
        size="sm"
        style={{
          position: 'absolute',
          top: 40,
          left: 20,
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}
        onPress={() => navigation.goBack()}
        centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
      />
      <CenteredView>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: selectedRestaurantCoordinate ? selectedRestaurantCoordinate.latitude : 0,
            longitude: selectedRestaurantCoordinate ? selectedRestaurantCoordinate.longitude : 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          customMapStyle={mapStyle}
        >
          {/** my position */}
          <Marker coordinate={location}>
            <Image source={AVATAR} style={{ borderRadius: 30, width: 40, height: 40 }} />
          </Marker>
          {/*  restaurants positions  */}
          {RESTAURANTS.map(restaurant => {
            const coordinate = RESTAURANTS_LOCATION.find(
              loc => loc.id === restaurant.id
            )?.coordinate;
            return (
              coordinate && <Marker key={restaurant.id} coordinate={coordinate} pinColor="green" />
            );
          })}
        </MapView>
        <FlatList
          horizontal
          data={RESTAURANTS}
          style={{
            position: 'absolute',
            bottom: 5,
            left: 0,
            right: 0,
            paddingHorizontal: 5,
          }}
          contentContainerStyle={{ paddingVertical: 10 }}
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
          keyExtractor={(item, index) => `${index}-${item.name}`}
          renderItem={renderItem}
          /*   onViewableItemsChanged={({ viewableItems }) => {
            if (viewableItems.length > 0) {
              setSelectedRestaurant(viewableItems[0].item);
              console.log(
                '🚀 ~ file: Map.tsx:274 ~ setSelectedRestaurant:',
                selectedRestaurant.name
              );
            }
          }} */
        />
      </CenteredView>
    </BackgoundContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  containerr: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 10,
    backgroundColor: 'black',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  selectedContainer: {
    borderColor: 'green',
    borderWidth: 5,
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
    marginBottom: 10,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: 'gray',
  },
});
export default Map;
