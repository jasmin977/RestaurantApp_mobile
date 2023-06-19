import * as React from "react";
import { Palette } from "../../themes";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";

const MenuIcon = () => (
  <View style={{ paddingLeft: 20 }}>
    <Svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke={Palette.text}
      width={30}
      height={30}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </Svg>
  </View>
);

export default MenuIcon;
