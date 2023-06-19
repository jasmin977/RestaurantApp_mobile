import FontSize from "./fontSize";
import Fonts from "./fonts";
import Palette from "./palette";

const Typography = {
  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.large,
    color: Palette.text,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: FontSize.medium,
    color: Palette.text,
  },
  subTitle: {
    fontFamily: Fonts.medium,
    fontSize: FontSize.medium,
    color: Palette.text,
  },
  hint: {
    fontFamily: Fonts.medium,
    fontSize: FontSize.small,
    color: Palette.text,
  },
};
export default Typography;
