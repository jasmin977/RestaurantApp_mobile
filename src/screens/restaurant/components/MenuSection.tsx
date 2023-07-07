import { FunctionComponent, useState } from 'react';
import { styled } from 'styled-components/native';
import { MenuCategory } from '../../../entities';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { MealCard } from '../../../components/common';
import { FlatList } from 'react-native';
import { View } from 'react-native';
import { RNText } from '../../../components/themed';
import { useTheme } from '../../../hooks';

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
      return menu.flatMap(category => category.items);
    }
    const category = menu.find(item => item.category === categoryName);
    return category ? category.items : [];
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>('Burger');
  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View>
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
          getCategoryItems(selectedCategory).map(item => (
            <MealCard
              name={item.name}
              rating={item.rating}
              key={`${item.name}_${item.description}`}
              img={item.img}
            />
          ))}
      </MenuItemsContainer>
    </View>
  );
};

export default MenuSection;
