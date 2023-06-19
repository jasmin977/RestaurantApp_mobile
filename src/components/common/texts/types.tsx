import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

export interface StyledTypo {
  fontFamily?: string;
  fontSize?: number;
  color?: string;
}

export interface HeadingProps {
  typoStyle: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: ReactNode;
}
export interface TextProps {
  textStyle?: StyleProp<TextStyle>;
  children: ReactNode;
}
