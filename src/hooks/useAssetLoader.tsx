import { useEffect, useState } from 'react';
import { BOLD, MEDIUM, REGULAR } from '../assets';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import { usePersmissions } from './usePermission';

export function useAssetLoader() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Load fonts
  const [fontsLoaded] = useFonts({
    FONT_BOLD: BOLD,
    FONT_REGULAR: REGULAR,
    FONT_MEDIUM: MEDIUM,
  });

  // Fetch color scheme
  const colorScheme = useColorScheme();

  // Load SVG assets ..
  // Initialize i18n ..

  // Combine all loading states
  const isLoading = !fontsLoaded || !colorScheme;

  return { isLoading };
}
