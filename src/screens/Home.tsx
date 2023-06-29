import { FunctionComponent } from 'react';
import { styled } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { restaurants } from '../data/restaurants';

import { ListSection } from '../components/layout';
import { BackgoundContainer } from '../components/common';
import { useTheme } from '../hooks';
import { RNButton, RNIcon, RNInput } from '../components/themed';
import { FilterIcon, SearchIcon } from '../assets';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { theme, isDarkTheme } = useTheme();
  const HomeContainer = styled(BackgoundContainer)`
    background-color: ${theme.colors.background};
    padding-top: 10px;
    flex: 1;
    padding-bottom: 120px;
  `;

  const StyledScrollView = styled.ScrollView`
    flex: 1;
  `;
  const SearchView = styled.View`
    padding: 5px;
    gap: 10px;
    justify-content: space-evenly;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
  `;
  return (
    <StyledScrollView>
      <HomeContainer>
        <StatusBar style={isDarkTheme ? 'light' : 'dark'} />

        <SearchView>
          <RNInput placeholder="search" icon={<SearchIcon />} />
          <RNButton
            children={
              <RNIcon outline={true} color="white">
                <FilterIcon />
              </RNIcon>
            }
            onPress={() => console.log('filter button pressed')}
          />
        </SearchView>
        <ListSection header="Recommended" data={restaurants} />
        <ListSection header="Popular Near you" data={restaurants} />
      </HomeContainer>
    </StyledScrollView>
  );
};

export default Home;
