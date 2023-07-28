import React, { useContext } from 'react';

import LottieView from 'lottie-react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BackgoundContainer } from '../../components/common';
import CenteredContainer from '../../components/common/containers/Centered';
import { Box, RNButton, RNText } from '../../components/themed';
import { ScreenWidth } from '../../components/common/containers/Backgound';

import assets, { BackIcon } from '../../assets';

import { StyleSheet, ActivityIndicator } from 'react-native';
import { useAppState, useAuth, useTheme } from '../../context';
import { scale } from '../../helpers';

interface ScanningProps {
  handleBarCodeScanned: (data: any) => void;
  markFirstTimeScanned: () => void;
  setisScanned: (s: boolean) => void;
  scanned: boolean;
  firstTimeScanned: boolean;
  isloading: boolean;
  hasPermission: boolean | null;
}

const ScanQRview: React.FC<ScanningProps> = ({
  handleBarCodeScanned,
  markFirstTimeScanned,
  firstTimeScanned,
  scanned,
  setisScanned,
  hasPermission,
  isloading,
}) => {
  const { theme } = useTheme();

  console.log('🚀 ~ file: scanQRView.tsx:20 ~ scanned:', scanned);
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
          onBarCodeScanned={scanned ? () => setisScanned(false) : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
        >
          {isloading ? (
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
          {scanned && <RNButton title={'Tap to Scan Again'} onPress={() => setisScanned(false)} />}
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

export default ScanQRview;
