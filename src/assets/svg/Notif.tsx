import * as React from "react";
import { Palette } from "../../themes";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";

const NotifIcon = () => (
  <View style={{ paddingRight: 20 }}>
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
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
      />
    </Svg>
  </View>
);

export default NotifIcon;
