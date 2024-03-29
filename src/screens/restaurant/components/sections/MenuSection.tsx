import { FunctionComponent, useState } from 'react';
import { styled } from 'styled-components/native';
import { MenuCategory } from '../../../../entities';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

import { FlatList } from 'react-native';
import { View } from 'react-native';
import { RNText } from '../../../../components/themed';
import { useTheme } from '../../../../context';
import MealItem from '../cards/MealItem';
import { moderateScale } from '../../../../helpers';

interface MenuSectionProps {
  menu: MenuCategory[];
}

interface MenuCategoryItemProps {
  category: string;
  onPress: (event: GestureResponderEvent) => void | undefined;
  selectedCategory: string | null;
}

const MenuItemsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 15px;
`;

const MenuCategoryItem: React.FunctionComponent<MenuCategoryItemProps> = ({
  category,
  onPress,
  selectedCategory,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <RNText variant="subtitle" color={selectedCategory === category ? 'primary' : 'onCard'}>
        {category}
      </RNText>
    </TouchableOpacity>
  );
};

const MenuSection: FunctionComponent<MenuSectionProps> = ({ menu }) => {
  const getCategoryItems = (categoryName: string) => {
    if (categoryName === 'Most Popular') {
      return menu.flatMap(category => category.meals);
    }
    const category = menu.find(item => item.category === categoryName);
    return category ? category.meals : [];
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>('Burger');
  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={{ paddingHorizontal: moderateScale(20), paddingVertical: moderateScale(20) }}>
      <FlatList
        data={[{ category: 'Most Popular' }, ...menu]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20, paddingVertical: 10 }}
        renderItem={({ item }) => (
          <MenuCategoryItem
            selectedCategory={selectedCategory}
            category={item.category}
            onPress={() => handleCategoryPress(item.category)}
          />
        )}
        keyExtractor={item => item.category}
      />
      <MenuItemsContainer>
        {selectedCategory &&
          (getCategoryItems(selectedCategory).length > 0 ? (
            getCategoryItems(selectedCategory).map(item => (
              <MealItem
                name={item.name}
                rating={item.rating}
                key={`${item.name}_${item.description}`}
                url={item.url}
              />
            ))
          ) : (
            <RNText color="black">No items in this category</RNText>
          ))}
      </MenuItemsContainer>
    </View>
  );
};

export default MenuSection;
