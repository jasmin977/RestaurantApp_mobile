import React, { useState, useEffect, FunctionComponent } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { usePersmissions } from '../../hooks';
import { RootStackParamList } from '../../navigators/ROUTES';
import AppDataCache from '../../cache/appData';
import { useAppState, useTheme } from '../../context';
import { BackgoundContainer } from '../../components/common';
import CenteredContainer from '../../components/common/containers/Centered';
import { Box, RNButton, RNText } from '../../components/themed';
import { scale } from '../../helpers';
import assets from '../../assets';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ScreenWidth } from '../../components/common/containers/Backgound';

type ScanScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ScanScreenNavigationProp;
};

export const ScanQRcontainer: FunctionComponent<Props> = ({ navigation }) => {
  const { hasPermission } = usePersmissions('barcode');
  const { firstTimeScanned, setFirstTimeScanned } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [isScanned, setisScanned] = useState(false);
  const { theme } = useTheme();

  const handleBarCodeScanned = ({ data }: any) => {
    setisScanned(true);

    navigation.push('RestaurantStack', {
      screen: 'RestaurantProfile',
      params: {
        id: parseInt(data),
      },
    });
  };
  const markFirstTimeScanned = () => {
    AppDataCache.storeAppData({ firstTimeScanned: true });
    setFirstTimeScanned(true);
  };
  /*   useFocusEffect(
    React.useCallback(() => {
      setisScanned(false);
      console.log('focused', isScanned);
      return () => {
        console.log('no more focused', isScanned);
      };
    }, [])
  ); */

  if (hasPermission === null) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>Requesting...</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }
  if (hasPermission === false) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>No access to camera</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  const Scannig_qr_code_color_filters = [
    {
      keypath: 'guide Outlines',
      color: theme.colors.primary,
    },
    {
      keypath: 'scanning',
      color: theme.colors.white,
    },
  ];
  const Scannig_color_filters = [
    {
      keypath: 'Shape Layer 1',
      color: theme.colors.background,
    },
    {
      keypath: 'Phone.Shape Layer 5',
      color: theme.colors.primary,
    },
  ];

  return (
    <BackgoundContainer>
      {!firstTimeScanned ? (
        <CenteredContainer>
          <Box gap={5} spacing={{ px: 20 }}>
            <LottieView
              autoPlay
              loop
              style={{
                width: scale(300),
                height: scale(300),
              }}
              colorFilters={Scannig_color_filters}
              source={assets.lottieFiles.ScannigCode}
            />
            <RNText align="center" variant="caption">
              Place your phone and Scan the QR code to access reviews.
            </RNText>
            <RNButton onPress={markFirstTimeScanned} title="Scan" />
          </Box>
        </CenteredContainer>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={isScanned ? () => setisScanned(false) : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
        >
          {isLoading ? (
            <ActivityIndicator size={'large'} color={theme.colors.primary}></ActivityIndicator>
          ) : (
            <LottieView
              autoPlay
              loop
              style={{
                width: ScreenWidth,
                height: ScreenWidth,
              }}
              colorFilters={Scannig_qr_code_color_filters}
              source={assets.lottieFiles.QRscanner}
            />
          )}
          {isScanned && (
            <RNButton title={'Tap to Scan Again'} onPress={() => setisScanned(false)} />
          )}
        </BarCodeScanner>
      )}
    </BackgoundContainer>
  );
};
const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScanQRcontainer;
