import { ViewStyle, StyleSheet } from 'react-native';
import React from 'react';
import { Box, RNIcon, RNText } from '../../../../components/themed';
import { StarIcon } from '../../../../assets';
import { lightPalette } from '../../../../themes';

interface RatingStarsProps {
  rating: number;
  size?: number;
  detailed?: boolean;
  style?: ViewStyle;
  bg?: keyof typeof lightPalette;
}

const RatingStars = ({ rating, size, detailed = false, style, bg, ...rest }: RatingStarsProps) => {
  const filledStars = Math.floor(rating);
  const outlineStars = 5 - filledStars;

  const renderFilledStars = () =>
    [...Array(filledStars)].map((_, index) => (
      <RNIcon key={index} size={size} color="primary" as={<StarIcon />} />
    ));

  const renderOutlineStars = () =>
    [...Array(outlineStars)].map((_, index) => (
      <RNIcon key={index} size={size} outline color="primary" as={<StarIcon />} />
    ));

  return (
    <Box direction="horizontal" bg={bg} gap={5} style={style} {...rest}>
      {detailed ? (
        <>
          {renderFilledStars()}
          {renderOutlineStars()}
          <RNText variant="subtitle">{rating.toFixed(1)}</RNText>
        </>
      ) : (
        <>
          <RNIcon outline={false} color="primary" size={size} as={<StarIcon outline={false} />} />
          <RNText variant="subtitle">{rating.toFixed(1)}</RNText>
        </>
      )}
    </Box>
  );
};

export default RatingStars;
