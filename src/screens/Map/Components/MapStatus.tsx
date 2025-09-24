import React from 'react';
import { BackgoundContainer, CenteredView } from '../../../components/common';
import { RNButton, RNText } from '../../../components/themed';
import { Region } from 'react-native-maps';

interface MapStatusProps {
  hasPermission: boolean | null;
  errorMsg: string | null;
  mylocation: Region | undefined;
  isLoading: boolean;
}

const MapStatus: React.FC<MapStatusProps> = ({
  hasPermission,
  errorMsg,
  mylocation,
  isLoading,
}) => {
  if (!hasPermission) {
    return (
      <BackgoundContainer>
        <CenteredView>
          <RNText>{errorMsg}</RNText>
        </CenteredView>
      </BackgoundContainer>
    );
  }

  if (!mylocation) {
    return (
      <BackgoundContainer>
        <CenteredView>
          <RNText>no location </RNText>
          <RNButton title="Get location" />
        </CenteredView>
      </BackgoundContainer>
    );
  }

  if (isLoading) {
    return (
      <BackgoundContainer>
        <CenteredView>
          <RNText>loading</RNText>
        </CenteredView>
      </BackgoundContainer>
    );
  }

  return null;
};

export default MapStatus;
