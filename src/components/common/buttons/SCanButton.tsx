import { FunctionComponent } from "react";
import { View, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Palette } from "../../../themes";
import { QRcodeIcon } from "../../../assets";

const ScanButton: FunctionComponent = () => {
  return (
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 100,
        top: -10,
        backgroundColor: "white",

        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
      }}
    >
      <LinearGradient
        colors={[Palette.PrimaryColor, Palette.SecondColor]}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRcodeIcon />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default ScanButton;
