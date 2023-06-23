import { FunctionComponent } from "react";
import { StatusBar } from "expo-status-bar";
import {
  BackgoundContainer,
  CenteredView,
  Paragraph,
} from "../components/common";

interface ScanQRProps {}

const ScanQRScreen: FunctionComponent<ScanQRProps> = () => {
  return (
    <BackgoundContainer>
      <StatusBar style="light" />
      <CenteredView>
        <Paragraph>SCAN</Paragraph>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default ScanQRScreen;
