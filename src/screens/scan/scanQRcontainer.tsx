import React, { useState, useEffect, useContext, FunctionComponent } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { ScanStackParamList } from '../../navigators/stacks/Scan';
import { StackNavigationProp } from '@react-navigation/stack';
import ScanQRview from './scanQRView';
import { usePersmissions } from '../../hooks';
import { StateContext } from '../../context';

type ScanScreenNavigationProp = StackNavigationProp<ScanStackParamList, 'Scan'>;
type ScanScreenRouteProp = RouteProp<ScanStackParamList, 'Scan'>;

type Props = {
  navigation: ScanScreenNavigationProp;
  route: ScanScreenRouteProp;
};

export const ScanQRcontainer: FunctionComponent<Props> = ({ navigation, route }) => {
  const { hasPermission } = usePersmissions();
  const { isScanned, scanQRcode } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [scannedData, setScannedData] = useState('');

  const navigateToRestaurantProfile = () => {
    navigation.navigate('RestaurantStack', {
      screen: 'RestaurantProfile',
      params: {
        id: parseInt(scannedData),
      },
    });
  };

  const handleBarCodeScanned = ({ data }: any) => {
    setScannedData(data);
    scanQRcode(true);
  };
  useEffect(() => {
    if (isScanned) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);

        navigateToRestaurantProfile();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isScanned, scannedData]);

  useFocusEffect(
    React.useCallback(() => {
      scanQRcode(false);

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
