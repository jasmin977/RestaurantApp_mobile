import { FunctionComponent } from "react";
import { ImageBackground } from "react-native";
import Review from "../review/Review";
import { Palette } from "../../../themes";
import { ScreenWidth } from "../containers/Backgound";
import SubTitle from "../texts/SubTitle";
import { Meal } from "../../../entities";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

const MealItem: FunctionComponent<Meal> = ({ name, rating, img }) => {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      <ImageBackground
        resizeMode="cover"
        imageStyle={{ borderRadius: 20 }}
        style={{ width: ScreenWidth * 0.4, height: 150 }}
        source={img}
      >
        <Review
          rating={rating}
          additinalStyle={{
            backgroundColor: Palette.surafce,
            borderRadius: 100,
            width: "50%",
            paddingHorizontal: 5,
            top: 10,
            left: 10,
          }}
        />
        <LinearGradient
          style={{
            bottom: 0,
            position: "absolute",
            width: "100%",
            padding: 10,
            paddingBottom: 5,
          }}
          colors={["transparent", Palette.background]}
        >
          <SubTitle>{name}</SubTitle>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default MealItem;
