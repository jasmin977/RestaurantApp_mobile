import { FunctionComponent } from "react";
import { styled } from "styled-components/native";

import ButtnProps from "./types";
import { Palette } from "../../../themes";
import { FilterIcon } from "../../../assets";

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  background-color: ${Palette.PrimaryColor};
  border-radius: 10px;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const FilterButton: FunctionComponent<ButtnProps> = ({
  onPress,
  btnStyle,
  textStyle,
  children,
}) => {
  return (
    <ButtonView onPress={onPress} style={btnStyle}>
      <FilterIcon />
    </ButtonView>
  );
};

export default FilterButton;
