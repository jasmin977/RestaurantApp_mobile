import { FunctionComponent } from "react";
import { styled } from "styled-components/native";
import { StatusBar } from "expo-status-bar";
import { restaurants } from "../data/restaurants";
import { Palette } from "../themes";
import SearchInput from "../components/common/inputs/Search";
import { ListSection } from "../components/layout";
import { BackgoundContainer } from "../components/common";

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
    <StyledScrollView>
      <HomeContainer>
        <StatusBar style="light" />
        <SearchInput></SearchInput>

        <ListSection header="Recommended" data={restaurants} />
        <ListSection header="Popular Near you" data={restaurants} />
      </HomeContainer>
    </StyledScrollView>
  );
};

export default Home;
