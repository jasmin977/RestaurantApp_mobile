import { FunctionComponent } from "react";
import { styled } from "styled-components/native";

import FilterButton from "../buttons/FilterButton";
import { Palette } from "../../../themes";

//types
interface SearchInputProps {}

const StyledView = styled.View`
  padding: 5px;
  width: 100%;
  justify-content: space-evenly;
  flex-direction: row;
  background-color: ${Palette.background};
  border-radius: 5px;
`;
const StyledInput = styled.TextInput`
  font-size: 15px;
  background-color: ${Palette.surafce};
  color: ${Palette.text};
  border-radius: 10px;
  font-family: FONT_REGULAR;
  width: 250px;
  padding-left: 20px;
`;

const SearchInput: FunctionComponent<SearchInputProps> = () => {
  return (
    <StyledView>
      <StyledInput placeholder="Search.." placeholderTextColor={Palette.text} />
      <FilterButton onPress={() => {}} children={"+"} />
    </StyledView>
  );
};

export default SearchInput;
