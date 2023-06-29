import { FunctionComponent } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BackgoundContainer, CenteredView } from '../components/common';
import { RNText } from '../components/themed';

interface ScanQRProps {}

const ScanQRScreen: FunctionComponent<ScanQRProps> = () => {
  return (
    <BackgoundContainer>
      <CenteredView>
        <RNText>scan</RNText>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default ScanQRScreen;
