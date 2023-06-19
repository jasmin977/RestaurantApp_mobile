import { FunctionComponent } from "react";
import { styled } from "styled-components/native";
import { Palette } from "../themes";
import { BackgoundContainer, CenteredView, Paragraph } from "../components";
import { StatusBar } from "expo-status-bar";

const HomeContainer = styled(BackgoundContainer)`
  background-color: ${Palette.background};
  padding-top: 10px;
  flex: 1;
  padding-bottom: 120px;
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <BackgoundContainer>
      <StatusBar style="light" />
      <CenteredView>
        <Paragraph>Feed page</Paragraph>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Home;
