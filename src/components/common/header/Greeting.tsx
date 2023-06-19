import { FunctionComponent } from "react";
import { StyleProp, TextStyle } from "react-native";
import { styled } from "styled-components/native";
import Title from "../texts/Title";
import Hint from "../texts/Hint";

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: column;
`;
interface GreetingProps {
  mainText: string;
  subText: string;
  mainTextStyle?: StyleProp<TextStyle>;
  subTextStyle?: StyleProp<TextStyle>;
}

const Greeting: FunctionComponent<GreetingProps> = ({
  mainText,
  subText,
  mainTextStyle,
  subTextStyle,
}) => {
  return (
    <StyledView>
      <Title textStyle={mainTextStyle}>{mainText}</Title>
      <Hint textStyle={subTextStyle}>{subText}</Hint>
    </StyledView>
  );
};

export default Greeting;
