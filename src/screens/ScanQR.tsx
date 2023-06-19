import { FunctionComponent } from "react";
import { BackgoundContainer, CenteredView, Paragraph } from "../components";
import { StatusBar } from "expo-status-bar";

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
