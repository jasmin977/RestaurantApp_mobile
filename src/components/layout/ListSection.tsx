import { FunctionComponent } from 'react';
import { styled } from 'styled-components/native';
import { ScrollView, View } from 'react-native';
import { Restaurant } from '../../entities';
import { BackgoundContainer, RestaurantItem } from '../common';
import { RNText } from '../themed';

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
  data: Array<Restaurant>;
}

const ListSection: FunctionComponent<ListSectionProps> = ({
  data,
  header,
  horizontal = true,
  seeMore = 'see more',
}) => {
  return (
    <View>
      <HeaderView>
        <RNText variant="h5">{header}</RNText>
        <RNText variant="caption">{seeMore}</RNText>
      </HeaderView>
      <ScrollView horizontal={horizontal}>
        <List>
          {data.map((item: Restaurant) => (
            <RestaurantItem key={`key_${item.id}_for${header}`} {...item} />
          ))}
        </List>
      </ScrollView>
    </View>
  );
};

export default ListSection;
