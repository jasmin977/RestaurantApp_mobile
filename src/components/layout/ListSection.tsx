import { FunctionComponent } from "react";
import { styled } from "styled-components/native";

import { ScrollView, TouchableOpacity } from "react-native";
import BackgoundContainer from "../common/containers/Backgound";
import SubTitle from "../common/texts/SubTitle";
import Hint from "../common/texts/Hint";
import CardItem, { CardProps } from "../common/cards/CardItem";

//components
const StyledCardList = styled(BackgoundContainer)``;

const List = styled.View`
  flex: 1;
  gap: 5px;
  flex-direction: row;
  padding-left: 20px;
  width: 100%;
`;

const HeaderView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 5px;
  padding-top: 20px;
  flex-direction: row;
`;

//types
interface ListSectionProps {
  horizontal?: boolean;
  header: string;
  seeMore?: string;
  data: Array<CardProps>;
}

const ListSection: FunctionComponent<ListSectionProps> = ({
  data,
  header,
  horizontal = true,
  seeMore = "see more",
}) => {
  return (
    <StyledCardList>
      <HeaderView>
        <SubTitle>{header}</SubTitle>
        <Hint>{seeMore}</Hint>
      </HeaderView>
      <ScrollView horizontal={horizontal}>
        <List>
          {data.map((item: CardProps) => (
            <CardItem key={`key_${item.id}_for${header}`} {...item} />
          ))}
        </List>
      </ScrollView>
    </StyledCardList>
  );
};

export default ListSection;
