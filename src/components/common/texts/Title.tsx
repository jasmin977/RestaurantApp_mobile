import { FunctionComponent } from "react";

import { TextProps } from "./types";
import { Text } from "react-native";
import { Typography } from "../../../themes";

const Title: FunctionComponent<TextProps> = ({ textStyle, children }) => {
  return <Text style={[Typography.title, textStyle]}>{children}</Text>;
};

export default Title;
