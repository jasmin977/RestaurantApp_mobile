import * as React from "react";
import { Palette } from "../../themes";
import Svg, { Path } from "react-native-svg";

const BackIcon = () => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke={Palette.text}
    width={30}
    height={30}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </Svg>
);

export default BackIcon;
