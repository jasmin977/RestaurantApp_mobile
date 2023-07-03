import { FunctionComponent } from 'react';
import { styled } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { restaurants } from '../data/restaurants';
import { ListSection } from '../components/layout';
import { Greeting } from '../components/common';
import { useTheme } from '../hooks';
import { RNButton, RNIcon, RNInput } from '../components/themed';
import { FilterIcon, SearchIcon } from '../assets';
import Drawer from '../navigators/Drawer';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { theme, isDarkTheme } = useTheme();
  const HomeContainer = styled.View`
    background-color: ${theme.colors.background};
    flex: 1;
    padding-bottom: 50px;
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
  const HeaderView = styled.View`
    margin-left: 50px;
    margin-top: -25px;
    padding: 20px;
  `;
  return (
    <Drawer>
      <StyledScrollView>
        <HomeContainer>
          <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
          <HeaderView>
            <Greeting mainText="Hey!👋" subText="Share your own experiences" />
          </HeaderView>
          <SearchView>
            <RNInput placeholder="search" icon={<SearchIcon />} />
            <RNButton
              size="sm"
              centerIcon={
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
    </Drawer>
  );
};

export default Home;
