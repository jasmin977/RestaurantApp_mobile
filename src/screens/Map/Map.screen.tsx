import { FunctionComponent, useCallback, useState, useRef, useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootBottomStackParamList } from '../../navigators/stacks/BotoomTab';
import { useCurrentPosition, usePersmissions } from '../../hooks';
import { useAuth, useTheme } from '../../context';
import { DirectionService, RestaurantService } from '../../service';
import { Coords } from '../../entities';
import MapPresentation from './MapPresentation';
import MapView, { Region } from 'react-native-maps';
import MapStatus from './Components/MapStatus';

type Props = NativeStackScreenProps<RootBottomStackParamList, 'Map'>;
const MapContainer: FunctionComponent<Props> = ({ navigation }) => {
  const { mylocation } = useCurrentPosition();
  const { token } = useAuth();

  const { data: restaurantData, isLoading, error } = RestaurantService.useFetchRestaurants(token);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Coords | null>(null);
  const { data, mutate: getDirection } = DirectionService.getDirection();
  const { hasPermission, errorMsg } = usePersmissions('location');
  const { theme, isDarkTheme } = useTheme();
  const mapRef = useRef<MapView>(null);

  const getRestaurantDirection = async () => {
    try {
      const sourceCoordinate = mylocation ? [mylocation.longitude, mylocation.latitude] : null;
      const destCoordinate = selectedRestaurant
        ? [selectedRestaurant.longitude, selectedRestaurant.latitude]
        : null;
      if (sourceCoordinate) {
        getDirection({ src: sourceCoordinate, dest: destCoordinate });
      }
    } catch (error) {
      console.error('Error while getting directions:', error);
    }
  };

  const goToRestaurantPosition = async (coords: Coords) => {
    if (!coords) {
      console.error('Restaurant coord not found');
      return;
    }

    const { latitude, longitude } = coords;
    const region: Region = {
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current?.animateToRegion(region, 3000);
    setSelectedRestaurant(coords);
  };

  const goToMyPosition = () => {
    if (mylocation) {
      mapRef.current?.animateToRegion(mylocation, 3000);
    }
  };
  if (!hasPermission || !mylocation || errorMsg || isLoading) {
    return (
      <MapStatus
        hasPermission={hasPermission}
        errorMsg={errorMsg}
        mylocation={mylocation}
        isLoading={isLoading}
      />
    );
  }

  return (
    <MapPresentation
      mapRef={mapRef}
      mylocation={mylocation}
      isDarkTheme={isDarkTheme}
      selectedRestaurant={selectedRestaurant}
      restaurantData={restaurantData.data.restaurants}
      goToMyPosition={goToMyPosition}
      goToRestaurantPosition={goToRestaurantPosition}
      getRestaurantDirection={getRestaurantDirection}
      data={data}
    />
  );
};

export default MapContainer;
