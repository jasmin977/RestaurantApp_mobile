import React from 'react';
import LottieView from 'lottie-react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BackgoundContainer } from '../../components/common';
import CenteredContainer from '../../components/common/containers/Centered';
import { RNButton, RNText, Stack } from '../../components/themed';
import { ScreenHeigh, ScreenWidth } from '../../components/common/containers/Backgound';

import assets from '../../assets';
import { useTheme } from '../../hooks';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

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
  return (
    <BackgoundContainer>
      {/*  {scanned && !isloading ? (
        <CenteredContainer>
          <Stack>
            <RNText variant="subtitle">Scan QR Code to access reviews </RNText>
            <RNText align="center" variant="caption">
              some text to explain what user can benefits from using the application.
            </RNText>
          </Stack>
        </CenteredContainer>
      ) : ( */}
      <View style={{ flex: 1, backgroundColor: '#000', padding: 0 }}>
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
            <Stack spacing={10}>
              <LottieView
                autoPlay
                style={{
                  width: 300,
                  height: 300,
                }}
                colorFilters={colorFilters}
                source={assets.lottieFiles.QRscanSuccessful}
              />
              <RNText variant="subtitle">Scanned succefully</RNText>
            </Stack>
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
      </View>
    </BackgoundContainer>
  );
};
const styles = StyleSheet.create({
  cameraContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,

    height: '100%',
    padding: 0,
  },
});

export default ScanQRview;
