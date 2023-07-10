import { FunctionComponent } from 'react';
import { styled } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';

import { Carousel, ListSection } from '../components/layout';
import { Greeting } from '../components/common';
import { useTheme } from '../hooks';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../components/themed';
import { FilterIcon, MenuIcon, SearchIcon } from '../assets';
import Drawer from '../navigators/Drawer';
import { TouchableOpacity } from 'react-native';
import { RESTAURANTS } from '../data';

interface HomeProps {
  toggleDrawer: () => void;
}

const Home: FunctionComponent<HomeProps> = ({ toggleDrawer }) => {
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
              centerIcon={<RNIcon as={<FilterIcon />} outline={true} color="white" />}
              onPress={() => console.log('filter button pressed')}
            />
          </SearchView>

          <Box
            direction="horizontal"
            w={'100%'}
            justifyContent="space-between"
            spacing={{ px: 20, py: 20 }}
          >
            <RNText color="onBackground" variant="h5">
              Best Restaurants
            </RNText>
            <RNText color="primary" variant="caption">
              View All
            </RNText>
          </Box>
          <Carousel data={RESTAURANTS} />

          <ListSection header="Recommended" data={RESTAURANTS} />
        </HomeContainer>
      </StyledScrollView>
    </Drawer>
  );
};

export default Home;
