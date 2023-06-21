import { FunctionComponent } from "react";
import { Palette } from "../../../themes";
import { StarIcon } from "../../../assets";
import { StyleProp, ViewStyle, View } from "react-native";
import CenteredContainer from "../containers/Centered";
import SubTitle from "../texts/SubTitle";
import Hint from "../texts/Hint";

type RatingProps = {
  rating: number;
  detailled?: boolean;
  additinalStyle?: StyleProp<ViewStyle>;
};

const Review: FunctionComponent<RatingProps> = ({
  rating,
  detailled = false,
  additinalStyle,
}) => {
  return (
    <View
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
        },
        additinalStyle,
      ]}
    >
      <StarIcon size={15} color={Palette.PrimaryColor} />

      <SubTitle textStyle={{ fontSize: 20 }}>{(5).toFixed(1)}</SubTitle>
      {detailled ? (
        <>
          <Hint>(30+)</Hint>

          <Hint textStyle={{ color: Palette.PrimaryColor }}>see review </Hint>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

export default Review;
