import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface ViewProps {
  viewStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
}
