import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../../../hooks';
import { Box, RNText } from '../../../components/themed';

interface StarPercentage {
  star: number;
  percentage: number;
}

const StarPercentage = () => {
  const starPercentages: StarPercentage[] = [
    { star: 5, percentage: 75 },
    { star: 4, percentage: 60 },
    { star: 3, percentage: 40 },
    { star: 2, percentage: 20 },
    { star: 1, percentage: 10 },
  ];
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    percentageBar: {
      height: 10,
      borderRadius: 5,
      backgroundColor: '#FF8A65',
    },
  });
  return (
    <Box gap={10} spacing={{ px: 20 }}>
      {starPercentages.map(starPercentage => (
        <Box
          key={starPercentage.star}
          direction="horizontal"
          gap={5}
          justifyContent="space-between"
        >
          <RNText variant="body">{starPercentage.star} Star</RNText>
          <Box h={10} rounded={5} bg="card" flex={1} alignItems="flex-start">
            <Box h={10} rounded={5} bg="primary" w={`${starPercentage.percentage}%`}></Box>
          </Box>
          <RNText variant="caption">{starPercentage.percentage}%</RNText>
        </Box>
      ))}
    </Box>
  );
};

export default StarPercentage;
