import { FunctionComponent } from "react";
import { styled } from "styled-components/native";

import ButtnProps from "./types";
import { Palette } from "../../../themes";
import SubTitle from "../texts/SubTitle";

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  background-color: ${Palette.SecondColor};
  border-radius: 10px;
`;

const RegularButton: FunctionComponent<ButtnProps> = ({
  onPress,
  btnStyle,
  textStyle,
  children,
}) => {
  return (
    <ButtonView onPress={onPress} style={btnStyle}>
      <SubTitle textStyle={textStyle}>{children}</SubTitle>
    </ButtonView>
  );
};

export default RegularButton;
