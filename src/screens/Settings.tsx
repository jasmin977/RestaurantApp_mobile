import { FunctionComponent } from "react";
import {
  BackgoundContainer,
  CenteredView,
  Paragraph,
} from "../components/common";

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  return (
    <BackgoundContainer>
      <CenteredView>
        <Paragraph>Setting page</Paragraph>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Settings;
