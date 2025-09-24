import { useEffect, useState } from 'react';
import { BOLD, MEDIUM, REGULAR } from '../assets';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import AppDataCache from '../cache/appData';
import { useAppState, useAuth } from '../context';
import UserCache from '../cache/userCache';

export default function useAssetLoader() {
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
