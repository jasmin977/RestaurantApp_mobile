import React, { useState, useEffect, useContext, FunctionComponent } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { ScanStackParamList } from '../../navigators/stacks/Scan';
import { StackNavigationProp } from '@react-navigation/stack';
import ScanQRview from './scanQRView';
import { usePersmissions } from '../../hooks';
import { StateContext } from '../../context';
import { RootStackParamList } from '../../navigators/ROUTES';

type ScanScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  navigation: ScanScreenNavigationProp;
};

export const ScanQRcontainer: FunctionComponent<Props> = ({ navigation }) => {
  const { hasPermission } = usePersmissions('barcode');

  const [isLoading, setIsLoading] = useState(false);
  const [isScanned, setisScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  const navigateToRestaurantProfile = () => {
    navigation.push('RestaurantStack', {
      screen: 'RestaurantProfile',
      params: {
        id: parseInt(scannedData),
      },
    });
  };

  const handleBarCodeScanned = ({ data }: any) => {
    setScannedData(data);
    setisScanned(true);
    navigateToRestaurantProfile();
  };
  /*   useEffect(() => {
    if (isScanned) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);

        navigateToRestaurantProfile();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isScanned, scannedData]);
 */
  useFocusEffect(
    React.useCallback(() => {
      setisScanned(false);

      return () => {
        // scanQRcode(false);
      };
    }, [])
  );
  return (
    <ScanQRview
      hasPermission={hasPermission}
      scanned={isScanned}
      isloading={isLoading}
      handleBarCodeScanned={handleBarCodeScanned}
    />
  );
};

export default ScanQRcontainer;
