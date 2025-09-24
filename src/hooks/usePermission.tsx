import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
type PermissionType = 'barcode' | 'location' | 'image';

export default function usePermissions(permissionType: PermissionType) {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const getPermissions = async () => {
    if (permissionType === 'barcode') {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access the camera was denied');
        return;
      }
    } else if (permissionType === 'location') {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    } else if (permissionType === 'image') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access the image library was denied');
        return;
      }
    }

    setHasPermission(true);
  };

  useEffect(() => {
    getPermissions();
  }, [permissionType]);

  return { hasPermission, errorMsg };
}
