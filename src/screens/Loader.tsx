import { FunctionComponent } from "react";

import { LoaderIcon } from "../assets";
import { BackgoundContainer, CenteredView } from "../components/common";

interface LoaderProps {}

const LoaderScreen: FunctionComponent<LoaderProps> = () => {
  return (
    <BackgoundContainer>
      <CenteredView>
        <LoaderIcon />
      </CenteredView>
    </BackgoundContainer>
  );
};

export default LoaderScreen;
