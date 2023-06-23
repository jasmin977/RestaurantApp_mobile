import { ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

export default interface ButtnProps {
  btnStyle?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void | undefined;
  textStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
}
