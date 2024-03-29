import { FunctionComponent } from 'react';
import { ImageBackground } from 'react-native';

import { ScreenWidth } from '../../../../components/common/containers/Backgound';
import { Meal } from '../../../../entities';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import { RNText } from '../../../../components/themed';
import { useTheme } from '../../../../context';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from '../../../../helpers';
import RatingStars from '../reviews/RatingStars';
import { BASE_URL } from '../../../../CONSTANTS';

const MealItem: FunctionComponent<Meal> = ({ name, rating, url }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.5}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{ borderRadius: scale(10) }}
        style={{ width: ScreenWidth * 0.4, height: verticalScale(150) }}
        source={{ uri: `http://${BASE_URL}:8000/storage/${url}` }}
      >
        <RatingStars
          rating={rating}
          size={15}
          style={{
            width: '50%',
            backgroundColor: theme.colors.card,
            borderRadius: 30,
            padding: 2,
            top: moderateVerticalScale(5),
            left: moderateScale(5),
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
