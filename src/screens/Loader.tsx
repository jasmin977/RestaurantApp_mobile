import { FunctionComponent } from 'react';

import assets, { LoaderGif, LoaderIcon } from '../assets';

import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Box } from '../components/themed';
import LottieView from 'lottie-react-native';
import { scale } from '../helpers';

interface LoaderProps {}

const LoaderScreen: FunctionComponent<LoaderProps> = () => {
  return (
    <Box style={{ backgroundColor: '#F6F6F6' }} flex={1}>
      <StatusBar style="dark" />
      <LottieView
        autoPlay
        loop
        style={{
          width: scale(250),
          height: scale(250),
        }}
        source={assets.lottieFiles.Loader}
      />
    </Box>
  );
};

export default LoaderScreen;
