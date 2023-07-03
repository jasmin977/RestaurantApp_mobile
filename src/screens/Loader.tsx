import { FunctionComponent } from 'react';

import { LoaderGif, LoaderIcon } from '../assets';
import { BackgoundContainer, CenteredView } from '../components/common';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface LoaderProps {}

const LoaderScreen: FunctionComponent<LoaderProps> = () => {
  return (
    <BackgoundContainer>
      <StatusBar style="light" />
      <CenteredView viewStyle={{ backgroundColor: '#202128' }}>
        <Image source={LoaderGif} style={{ width: 250, height: 250 }} />
      </CenteredView>
    </BackgoundContainer>
  );
};

export default LoaderScreen;
