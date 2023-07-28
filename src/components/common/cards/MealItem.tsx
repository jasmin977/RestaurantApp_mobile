import { FunctionComponent } from 'react';
import { ImageBackground } from 'react-native';
import Review from '../review/Review';

import { ScreenWidth } from '../containers/Backgound';
import { Meal } from '../../../entities';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { RNText } from '../../themed';
import { useTheme } from '../../../context';
import { moderateVerticalScale, scale, verticalScale } from '../../../helpers';

const MealItem: FunctionComponent<Meal> = ({ name, rating, img }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{ borderRadius: scale(10) }}
        style={{ width: ScreenWidth * 0.4, height: verticalScale(150) }}
        source={{ uri: img }}
      >
        <Review
          rating={rating}
          additinalStyle={{
            backgroundColor: theme.colors.card,
            borderRadius: 100,
            width: '50%',
            paddingHorizontal: 5,
            top: verticalScale(10),
            left: scale(10),
          }}
        />
        <LinearGradient
          style={{
            bottom: 0,
            position: 'absolute',
            width: '100%',
            padding: scale(10),
            borderBottomLeftRadius: scale(10),
            borderBottomRightRadius: scale(10),
            paddingBottom: moderateVerticalScale(5),
          }}
          colors={['transparent', 'black']}
        >
          <RNText color="white">{name}</RNText>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default MealItem;
