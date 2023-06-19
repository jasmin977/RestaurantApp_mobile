import { FunctionComponent } from "react";
import { BackgoundContainer, CenteredView } from "../components";
import { LoaderIcon } from "../assets";

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
