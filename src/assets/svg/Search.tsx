import * as React from "react";
import { Palette } from "../../themes";
import Svg, { Path } from "react-native-svg";

const SearchIcon = () => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke={Palette.text}
    width={30}
    height={30}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </Svg>
);

export default SearchIcon;
