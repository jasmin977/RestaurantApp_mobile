import { useState, useEffect, FunctionComponent } from 'react';
import { Box, RNText } from '../../../components/themed';
import MapView, { Marker, LatLng } from 'react-native-maps';
import mapStyle from '../../Map/MapTheme';
import { useTheme } from '../../../hooks';
import { RESTAURANTS_LOCATION } from '../../../data';
import CenteredContainer from '../../../components/common/containers/Centered';

interface Props {
  id: number;
}

const LocationMap: FunctionComponent<Props> = ({ id }) => {
  const { theme } = useTheme();
  const [location, setLocation] = useState<LatLng | undefined>();

  useEffect(() => {
    const getLocation = () => {
      const selectedRestaurantLocation = RESTAURANTS_LOCATION.find(loc => loc.id === id);
      const coordinate = selectedRestaurantLocation?.coordinate;
      setLocation(coordinate as LatLng);
    };
    getLocation();
  }, [id]);

  if (!location) {
    return (
      <CenteredContainer>
        <RNText variant="body">loading.</RNText>
      </CenteredContainer>
    );
  }

  return (
    <Box h={400} spacing={{ px: 20 }}>
      <MapView
        style={{ width: '100%', height: '100%', borderRadius: 10 }}
        initialRegion={{
          latitude: location?.latitude ?? 0,
          longitude: location?.longitude ?? 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        customMapStyle={mapStyle}
      >
        <Marker
          coordinate={{
            latitude: location?.latitude ?? 0,
            longitude: location?.longitude ?? 0,
          }}
          pinColor={theme.colors.primary}
        />
      </MapView>
    </Box>
  );
};

export default LocationMap;
