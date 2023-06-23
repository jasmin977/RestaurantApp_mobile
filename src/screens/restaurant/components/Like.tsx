import { FunctionComponent } from "react";
import { styled } from "styled-components/native";
import { Palette } from "../../../themes";
import { ButtnProps } from "../../../components/common";
import { LikeIcon } from "../../../assets";

const ButtonView = styled.TouchableOpacity`
  align-items: center;
  background-color: ${Palette.surafce};
  border-radius: 10px;
  padding: 13px;
  align-items: center;
  justify-content: center;
`;

const LikeButton: FunctionComponent<ButtnProps> = ({ onPress, btnStyle }) => {
  return (
    <ButtonView onPress={onPress} style={btnStyle}>
      <LikeIcon color={Palette.PrimaryColor} />
    </ButtonView>
  );
};

export default LikeButton;
