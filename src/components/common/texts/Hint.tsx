import { FunctionComponent } from "react";
import { TextProps } from "./types";
import { Text } from "react-native";
import { Typography } from "../../../themes";

const Hint: FunctionComponent<TextProps> = ({ textStyle, children }) => {
  return <Text style={[Typography.hint, textStyle]}>{children}</Text>;
};

export default Hint;
