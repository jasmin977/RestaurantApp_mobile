import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Carousel, RNButton, RNIcon, RNText } from '../../components/themed';
import MapView, { Marker, PROVIDER_GOOGLE, Geojson, Region } from 'react-native-maps';
import LottieView from 'lottie-react-native';
import { RatingStars } from '../restaurant/components';
import assets, { AVATAR, DirectionIcon } from '../../assets';
import { CenteredView, MenuButton } from '../../components/common';
import { darkStyle, lightStyle } from './MapTheme';
import { Coords, Restaurant } from '../../entities';
import { COLORS } from '../../themes';
import RestaurantCard from './Components/RestaurantCard';
import { scale } from '../../helpers';

const marker_color_filters = [
  {
    keypath: 'Path 2',
    color: COLORS.primary,
  },
  {
    keypath: 'Ellipse 1',
    color: COLORS.primary,
  },
  {
    keypath: 'shadow',
    color: COLORS.grey[300],
  },
];
interface MapPresentationProps {
  mylocation: Region;
  isDarkTheme: boolean;
  selectedRestaurant: Coords | null;
  restaurantData: Restaurant[];
  goToMyPosition: () => void;
  goToRestaurantPosition: (coords: Coords) => void;
  getRestaurantDirection: () => void;
  data: any;
  mapRef: React.RefObject<MapView>;
}

const MapPresentation = ({
  mylocation,
  isDarkTheme,
  selectedRestaurant,
  restaurantData,
  goToMyPosition,
  goToRestaurantPosition,
  getRestaurantDirection,
  data,
  mapRef,
}: MapPresentationProps) => (
  <View style={{ flex: 1 }}>
    <Box style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}>
      <MenuButton />
    </Box>
    <Box gap={5} style={{ position: 'absolute', top: 40, right: 20, zIndex: 1 }}>
      <TouchableOpacity onPress={goToMyPosition}>
        <Image source={AVATAR} style={{ width: 50, height: 50, borderRadius: 10 }} />
      </TouchableOpacity>
      {selectedRestaurant && (
        <RNButton
          onPress={getRestaurantDirection}
          style={{ width: 50, height: 50 }}
          centerIcon={<RNIcon outline color="white" as={<DirectionIcon />} />}
        />
      )}
    </Box>

    <CenteredView>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        style={styles.map}
        initialRegion={mylocation}
        customMapStyle={isDarkTheme ? darkStyle : lightStyle}
      >
        <Marker coordinate={mylocation}>
          <Image
            source={AVATAR}
            style={{ borderRadius: 30, width: scale(40), height: scale(40) }}
          />
        </Marker>
        {restaurantData.map((restaurant: Restaurant) => {
          return (
            restaurant.coordinate && (
              <Marker
                onPress={() => goToRestaurantPosition(restaurant.coordinate)}
                key={restaurant.id}
                coordinate={restaurant.coordinate}
              >
                <Box>
                  <Box bg="card" spacing={{ p: 2 }} rounded={10}>
                    <RatingStars rating={restaurant.rating} size={15} />
                    <RNText>{restaurant.name}</RNText>
                  </Box>
                  <LottieView
                    autoPlay
                    loop
                    style={{
                      width: scale(50),
                      height: scale(50),
                    }}
                    source={assets.lottieFiles.MapMarker}
                    colorFilters={marker_color_filters}
                  />
                </Box>
              </Marker>
            )
          );
        })}
        {data && (
          <Geojson geojson={data.data} strokeColor={COLORS.primary} strokeWidth={scale(6)} />
        )}
      </MapView>
    </CenteredView>
    {restaurantData ? (
      <View style={{ paddingVertical: 5 }}>
        <Carousel<Restaurant>
          onPress={goToRestaurantPosition}
          data={restaurantData}
          cardWidth={0.8}
          renderItem={RestaurantCard}
        />
      </View>
    ) : (
      <Box>
        <RNText>Loading..</RNText>
      </Box>
    )}
  </View>
);

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapPresentation;
