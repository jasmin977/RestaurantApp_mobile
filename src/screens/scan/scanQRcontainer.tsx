import React, { useState, useEffect, FunctionComponent } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScanQRview from './scanQRView';
import { usePersmissions } from '../../hooks';
import { RootStackParamList } from '../../navigators/ROUTES';
import AppDataCache from '../../cache/appData';
import { useAppState } from '../../context';

type ScanScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ScanScreenNavigationProp;
};

export const ScanQRcontainer: FunctionComponent<Props> = ({ navigation }) => {
  const { hasPermission } = usePersmissions('barcode');
  const { firstTimeScanned, setFirstTimeScanned } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [isScanned, setisScanned] = useState(false);

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
  return (
    <ScanQRview
      hasPermission={hasPermission}
      scanned={isScanned}
      setisScanned={setisScanned}
      isloading={isLoading}
      firstTimeScanned={firstTimeScanned}
      markFirstTimeScanned={markFirstTimeScanned}
      handleBarCodeScanned={handleBarCodeScanned}
    />
  );
};

export default ScanQRcontainer;
