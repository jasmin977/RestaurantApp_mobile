import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import usePersmissions from './usePermission';
import { Region } from 'react-native-maps';

const useCurrentPosition = () => {
  const [mylocation, setLocation] = useState<Region>();

  const { hasPermission, errorMsg } = usePersmissions('location');

  const requestLocationPermission = async () => {
    if (hasPermission) {
      let location = await Location.getLastKnownPositionAsync({});

      if (location) {
        const { latitude, longitude } = location.coords;
        const myRegion: Region = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setLocation(myRegion);
      }
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, [hasPermission]);

  return { mylocation };
};

export default useCurrentPosition;
