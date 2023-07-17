import { FunctionComponent } from 'react';

import { LoaderGif, LoaderIcon } from '../assets';

import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box } from '../components/themed';

interface LoaderProps {}

const LoaderScreen: FunctionComponent<LoaderProps> = () => {
  return (
    <Box style={{ backgroundColor: '#F6F6F6' }} flex={1}>
      <StatusBar style="dark" />
      <Image source={LoaderGif} style={{ width: 250, height: 250 }} />
    </Box>
  );
};

export default LoaderScreen;
