import { useState, useEffect } from 'react';

import { BarCodeScanner } from 'expo-barcode-scanner';

export function usePersmissions() {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    console.log('🚀 ~ file: usePermission.tsx:10 ~ getBarCodeScannerPermissions ~ status:', status);
    setHasPermission(true);
  };

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  return { hasPermission };
}
