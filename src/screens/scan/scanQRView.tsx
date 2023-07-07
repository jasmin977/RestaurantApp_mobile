import React, { useContext } from 'react';

import LottieView from 'lottie-react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BackgoundContainer } from '../../components/common';
import CenteredContainer from '../../components/common/containers/Centered';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';
import { ScreenHeigh, ScreenWidth } from '../../components/common/containers/Backgound';

import assets, { BackIcon } from '../../assets';
import { useTheme } from '../../hooks';

import { StyleSheet, View } from 'react-native';
import { StateContext } from '../../context';

interface ScanningProps {
  handleBarCodeScanned: (data: any) => void;
  scanned: boolean;
  isloading: boolean;

  hasPermission: boolean | null;
}

const ScanQRview: React.FC<ScanningProps> = ({
  handleBarCodeScanned,
  scanned,

  hasPermission,
  isloading,
}) => {
  const { theme } = useTheme();
  const { isScanned, scanQRcode } = useContext(StateContext);
  if (hasPermission === null) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>Requesting for camera permission</RNText>
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
  const colorFilters = [
    {
      keypath: 'Circle 2',
      color: theme.colors.primary,
    },
    {
      keypath: 'Circle 1',
      color: '#f74b20',
    },
    {
      keypath: 'QR Scanner frame',
      color: theme.colors.white,
    },
    {
      keypath: 'Code information.QR Code 2',
      color: theme.colors.primary,
    },
    {
      keypath: 'Red line',
      color: theme.colors.primary,
    },
    {
      keypath: 'Scanned Code.QR Code - scanned',
      color: theme.colors.white,
    },
  ];

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
      {scanned && !isloading ? (
        <CenteredContainer>
          <Box gap={10} spacing={{ px: 20 }}>
            <LottieView
              autoPlay
              loop
              style={{
                width: ScreenWidth,
                height: ScreenWidth,
              }}
              colorFilters={Scannig_color_filters}
              source={assets.lottieFiles.ScannigCode}
            />
            <RNText align="center" variant="subtitle">
              Place your phone and Scan the QR code to access reviews.
            </RNText>
            <RNButton onPress={() => scanQRcode(false)} title="Scan" />
          </Box>
        </CenteredContainer>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
          /*   style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: ScreenWidth,
          height: ScreenHeigh,
        }} */
        >
          {isloading ? (
            <LottieView
              autoPlay
              duration={1}
              style={{
                width: 300,
                height: 300,
              }}
              colorFilters={colorFilters}
              source={assets.lottieFiles.QRscanSuccessful}
            />
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
