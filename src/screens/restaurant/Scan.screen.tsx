import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import { usePersmissions } from '../../hooks';
import { RootStackParamList } from '../../navigators/ROUTES';
import AppDataCache from '../../cache/appData';
import { useAppState, useTheme } from '../../context';
import { BackgoundContainer } from '../../components/common';
import CenteredContainer from '../../components/common/containers/Centered';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';
import { scale } from '../../helpers';
import assets, { rest_1 } from '../../assets';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ScreenWidth } from '../../components/common/containers/Backgound';
import { Camera, CameraType } from 'expo-camera';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import RestaurantOverView from './components/RestaurantOverView';

type ScanScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ScanScreenNavigationProp;
};

export const ScanQRcontainer: React.FC<Props> = ({ navigation }) => {
  const [type, setType] = useState(CameraType.back);
  const [id, setId] = useState<number | string | null>(null);
  const { hasPermission, errorMsg } = usePersmissions('barcode');
  const { firstTimeScanned, setFirstTimeScanned } = useAppState();
  const { theme } = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '95%'], []);
  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const markFirstTimeScanned = () => {
    AppDataCache.storeAppData({ firstTimeScanned: true });
    setFirstTimeScanned(true);
  };
  const toggleCameraType = () => {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  };
  const handleCloseBottomSheet = () => {
    setId(null);
  };

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
      keypath: 'White Solid 1',
      color: theme.colors.background,
    },
    {
      keypath: 'Phone.Shape Layer 5',
      color: theme.colors.primary,
    },
  ];
  if (!hasPermission) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>Requesting...</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  if (errorMsg) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>We need your permission to show the camera</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }
  return (
    <View style={styles.container}>
      {!firstTimeScanned ? (
        <CenteredContainer>
          <Box bg="background" flex={1} gap={5} spacing={{ px: 20 }}>
            <LottieView
              autoPlay
              loop
              style={{
                width: scale(ScreenWidth),
                height: scale(300),
              }}
              colorFilters={Scannig_color_filters}
              source={assets.lottieFiles.ScannigCode}
            />
            <RNText align="center" variant="subtitle">
              Place your phone and Scan the QR code to access reviews.
            </RNText>
            <RNButton onPress={markFirstTimeScanned} title="Start" />
          </Box>
        </CenteredContainer>
      ) : (
        <Camera
          flashMode={1}
          onBarCodeScanned={(...args) => {
            const data = args[0].data;

            setId(data);
            handleSnapPress(1);
            console.log('🚀 ~ file: scanQRcontainer.tsx:161 ~ data, id:', data, id);
          }}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          style={styles.camera}
          type={type}
        >
          <Box>
            <LottieView
              autoPlay
              loop
              style={{
                width: scale(ScreenWidth),
                height: scale(ScreenWidth),
              }}
              colorFilters={Scannig_qr_code_color_filters}
              source={assets.lottieFiles.QRscanner}
            />
          </Box>
          {/*   <RNButton title="Flip" onPress={toggleCameraType} /> */}
        </Camera>
      )}

      <BottomSheet
        backgroundStyle={{ backgroundColor: theme.colors.card }}
        enablePanDownToClose
        onClose={handleCloseBottomSheet}
        enableOverDrag
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        style={{ zIndex: 1 }}
        backgroundComponent={null}
        handleIndicatorStyle={{ display: 'none' }}
      >
        <BottomSheetScrollView>
          <RestaurantOverView id={id} navigation={navigation} />
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScanQRcontainer;
