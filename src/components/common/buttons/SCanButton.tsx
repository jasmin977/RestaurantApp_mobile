import { FunctionComponent } from "react";
import { View, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Palette } from "../../../themes";
import { QRcodeIcon } from "../../../assets";

const ScanButton: FunctionComponent = () => {
  return (
    <View
      style={{
        width: 60,
        height: 60,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LinearGradient
        colors={[Palette.PrimaryColor, Palette.PrimaryColor]}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <QRcodeIcon />
      </LinearGradient>
    </View>
  );
};

export default ScanButton;
