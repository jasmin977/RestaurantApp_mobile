import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import RootStack from "./src/navigators/RootStack";
import { BOLD, MEDIUM, REGULAR } from "./src/assets";
import { LoaderScreen } from "./src/screens";

//react navigation
export default function App() {
  const [fontLoaded] = useFonts({
    FONT_BOLD: BOLD,
    FONT_REGULAR: REGULAR,
    FONT_MEDIUM: MEDIUM,
  });

  if (!fontLoaded) {
    return <LoaderScreen />;
  }
  return <RootStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
