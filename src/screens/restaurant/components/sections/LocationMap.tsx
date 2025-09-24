import { useState, useEffect, FunctionComponent } from 'react';
import { Box, RNIcon, RNText } from '../../../../components/themed';
import MapView, { Marker, LatLng, PROVIDER_GOOGLE } from 'react-native-maps';

import { useTheme } from '../../../../context';
import LottieView from 'lottie-react-native';
import CenteredContainer from '../../../../components/common/containers/Centered';
import { darkStyle, lightStyle } from '../../../Map/MapTheme';
import assets, { NextIcon } from '../../../../assets';
import { COLORS } from '../../../../themes';
import { scale } from '../../../../helpers';

interface Props {
  location: LatLng;
}

const LocationMap: FunctionComponent<Props> = ({ location }: Props) => {
  const { theme, isDarkTheme } = useTheme();

  if (!location) {
    return (
      <CenteredContainer>
        <RNText variant="body">loading.</RNText>
      </CenteredContainer>
    );
  }
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
  return (
    <>
      <Box
        spacing={{ p: 20 }}
        alignItems="flex-start"
        direction="horizontal"
        justifyContent="space-between"
      >
        <RNText variant="subtitle">View in map</RNText>
        <RNIcon outline color="onBackground" as={<NextIcon />} />
      </Box>
      <Box h={500}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
          initialRegion={{
            latitude: location?.latitude ?? 0,
            longitude: location?.longitude ?? 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          customMapStyle={isDarkTheme ? darkStyle : lightStyle}
        >
          <Marker
            coordinate={{
              latitude: location?.latitude ?? 0,
              longitude: location?.longitude ?? 0,
            }}
          >
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
          </Marker>
        </MapView>
      </Box>
    </>
  );
};

export default LocationMap;
