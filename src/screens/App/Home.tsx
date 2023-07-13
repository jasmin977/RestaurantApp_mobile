import React from 'react';
import { BackgoundContainer } from '../../components/common';

import AnimatedHeader from '../../components/layout/AnimatedHeader&list';

import { Carousel } from '../../components/layout';
import { RESTAURANTS } from '../../data';

import { useTheme } from '../../context';
import { StatusBar } from 'expo-status-bar';

const Home = () => {
  const { isDarkTheme, theme } = useTheme();
  return (
    <BackgoundContainer>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <AnimatedHeader />
    </BackgoundContainer>
  );
};

export default Home;
