import { FunctionComponent } from 'react';

import { StarIcon } from '../../../assets';
import { ViewStyle, View } from 'react-native';
import { Box, RNIcon, RNText } from '../../themed';

type RatingProps = {
  rating: number;
  detailled?: boolean;
  additinalStyle?: ViewStyle;
  size?: number;
};

const Review: FunctionComponent<RatingProps> = ({
  rating,
  detailled = false,
  additinalStyle,
  size = 15,
}) => {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          flexDirection: 'row',
          gap: 8,
        },
        additinalStyle,
      ]}
    >
      {detailled ? (
        <Box direction="horizontal" gap={2}>
          {[...Array(rating)].map((_, index) => (
            <RNIcon as={<StarIcon />} key={index} outline={false} color="primary" size={size} />
          ))}
        </Box>
      ) : (
        <RNIcon outline={false} color="primary" size={size} as={<StarIcon outline={false} />} />
      )}

      <RNText color="onCard" variant="subtitle">
        {(5).toFixed(1)}
      </RNText>

      {/*  {detailled ? (
        <>
          <RNText>(30+)</RNText>

          <RNText color="primary">see review </RNText>
        </>
      ) : (
        <></>
      )} */}
    </View>
  );
};

export default Review;
