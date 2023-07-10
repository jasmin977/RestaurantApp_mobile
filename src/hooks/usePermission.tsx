import { useState, useEffect } from 'react';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
type PermissionType = 'barcode' | 'location';

export default function usePersmissions(permissionType: PermissionType) {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);

  const getPermissions = async () => {
    let { status } = await (permissionType === 'barcode'
      ? BarCodeScanner.requestPermissionsAsync()
      : Location.requestForegroundPermissionsAsync());

    if (status !== 'granted') {
      setErrorMsg(`Permission to access. ${permissionType} permission was denied`);
      return;
    }

    setHasPermission(status === 'granted');
    console.log(
      '🚀 ~ file: usePermission.tsx:22 ~ getPermissions ~ status:',
      permissionType,
      status
    );
  };

  useEffect(() => {
    getPermissions();
  }, [permissionType]);

  return { hasPermission, errorMsg };
}
