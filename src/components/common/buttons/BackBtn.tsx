import { FunctionComponent } from "react";
import { BackIcon } from "../../../assets";
import { styled } from "styled-components/native";
import ButtnProps from "./types";

const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 20px;
  z-index: 1;
`;

const BackButton: FunctionComponent<ButtnProps> = ({ onPress }) => {
  return (
    <BackButtonContainer onPress={onPress}>
      <BackIcon />
    </BackButtonContainer>
  );
};

export default BackButton;
