import { FunctionComponent } from "react";

import { TextProps } from "./types";
import { Text } from "react-native";
import { Typography } from "../../../themes";

const Paragraph: FunctionComponent<TextProps> = ({ textStyle, children }) => {
  return <Text style={[Typography.text, textStyle]}>{children}</Text>;
};

export default Paragraph;
