import { FunctionComponent } from "react";

import { TextProps } from "./types";

import { Text } from "react-native";
import { Typography } from "../../../themes";

const SubTitle: FunctionComponent<TextProps> = ({ textStyle, children }) => {
  return <Text style={[Typography.subTitle, textStyle]}>{children}</Text>;
};

export default SubTitle;
