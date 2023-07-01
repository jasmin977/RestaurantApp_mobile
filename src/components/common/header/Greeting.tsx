import { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { styled } from 'styled-components/native';

import { RNText } from '../../themed';
import { useTheme } from '../../../hooks';

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: column;
`;
interface GreetingProps {
  mainText: string;
  subText: string;
}

const Greeting: FunctionComponent<GreetingProps> = ({ mainText, subText }) => {
  const { theme } = useTheme();
  return (
    <StyledView>
      <RNText color="onBackground" variant="h4">
        {mainText}
      </RNText>
      <RNText color="onBackground" variant="caption">
        {subText}
      </RNText>
    </StyledView>
  );
};

export default Greeting;
