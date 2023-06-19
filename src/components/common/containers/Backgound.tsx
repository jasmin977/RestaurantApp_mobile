import { styled } from "styled-components/native";

import { Palette } from "../../../themes";
import { Dimensions } from "react-native";

export const BackgoundContainer = styled.View`
  flex: 1;
  background-color: ${Palette.background};
`;

export default BackgoundContainer;

export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeigh = Dimensions.get("screen").height;
