import { FunctionComponent, useEffect, useRef } from 'react';
import { BackgoundContainer, CenteredView } from '../components/common';
import { RNText } from '../components/themed';

interface MapProps {}

const Map: FunctionComponent<MapProps> = () => {
  return (
    <BackgoundContainer>
      <CenteredView>
        <RNText color="onBackground" variant="h4">
          MAP
        </RNText>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Map;
