import * as React from "react";
import { Palette } from "../../themes";
import Svg, { Path } from "react-native-svg";

const LoaderIcon = () => (
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
      d="M12,3V6M5.64,5.64,7.76,7.76M3,12H6m-.36,6.36,2.12-2.12M12,18v3m6.36-2.64-2.12-2.12M21,12H18m.36-6.36L16.24,7.76"
    />
  </Svg>
);

export default LoaderIcon;
