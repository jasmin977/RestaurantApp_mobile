import { FunctionComponent } from 'react';

import { StarIcon } from '../../../assets';
import { ViewStyle, View } from 'react-native';
import { RNIcon, RNText } from '../../themed';

type RatingProps = {
  rating: number;
  detailled?: boolean;
  additinalStyle?: ViewStyle;
};

const Review: FunctionComponent<RatingProps> = ({ rating, detailled = false, additinalStyle }) => {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 8,
        },
        additinalStyle,
      ]}
    >
      <RNIcon outline={false} color="primary" size={15}>
        <StarIcon outline={false} />
      </RNIcon>

      <RNText color="onCard" variant="subtitle">
        {(5).toFixed(1)}
      </RNText>

      {detailled ? (
        <>
          <RNText>(30+)</RNText>

          <RNText color="primary">see review </RNText>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Review;
