import { FunctionComponent } from "react";
import { ImageSourcePropType } from "react-native";
import { styled } from "styled-components/native";
import { Palette } from "../../../themes";
import SubTitle from "../texts/SubTitle";
import Title from "../texts/Title";

import { ScreenWidth } from "../containers/Backgound";

const StyledCard = styled.TouchableOpacity`
  width: ${ScreenWidth * 0.76}px;
  background-color: ${Palette.surafce};
  border-radius: 15px;
  margin-right: 20px;
  overflow: hidden;
  padding: 10px;
`;

const StyledView = styled.View`
  align-items: flex-start;
  justify-content: space-between;
  gap: 5px;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 15px;
`;
export interface CardProps {
  id: number;
  name: string;
  location: string;
  img: ImageSourcePropType;
}

const CardItem: FunctionComponent<CardProps> = ({ name, location, img }) => {
  return (
    <StyledCard activeOpacity={0.5}>
      <StyledView>
        <Title>{name}</Title>
        <StyledImage resizeMode="contain" source={img} />
        <SubTitle>{location}</SubTitle>
      </StyledView>
    </StyledCard>
  );
};

export default CardItem;
