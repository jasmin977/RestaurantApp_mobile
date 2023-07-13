import { FunctionComponent } from 'react';
import { styled } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';

import { Carousel, ListSection } from '../../components/layout';
import { Greeting } from '../../components/common';
import { useTheme } from '../../context';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../../components/themed';
import { FilterIcon, MenuIcon, SearchIcon } from '../../assets';
import Drawer from '../../navigators/Drawer';
import { TouchableOpacity } from 'react-native';
import { RESTAURANTS } from '../../data';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { theme, isDarkTheme } = useTheme();
  const HomeContainer = styled.View`
    background-color: ${theme.colors.background};
    flex: 1;
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
    margin-top: 25px;
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
            <Box
              flex={1}
              bg="card"
              justifyContent="flex-start"
              spacing={{ px: 10 }}
              rounded={8}
              direction="horizontal"
              gap={5}
            >
              <RNIcon outline as={<SearchIcon />} color="primary" />
              <RNText>search for restaurants</RNText>
            </Box>
            <RNButton
              size="sm"
              centerIcon={<RNIcon as={<FilterIcon />} outline={true} color="white" />}
              onPress={() => console.log('filter button pressed')}
            />
          </SearchView>

          <Carousel data={RESTAURANTS} />
        </HomeContainer>
      </StyledScrollView>
    </Drawer>
  );
};

export default Home;
