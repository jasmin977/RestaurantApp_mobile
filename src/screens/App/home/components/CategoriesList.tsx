import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Box, RNText } from '../../../../components/themed';
import { useTheme } from '../../../../context';
import { moderateScale, scale } from '../../../../helpers';

const categories = [
  { id: 1, name: 'Fast Food' },
  { id: 2, name: 'Breakfast' },
  { id: 3, name: 'Pizza' },
  { id: 4, name: 'Salad' },
  { id: 5, name: 'Burger' },
];
const FoodCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>(categories[0]);
  const { theme } = useTheme();
  interface FoodCategory {
    id: number;
    name: string;
  }

  const handleCategorySelect = (category: FoodCategory) => {
    setSelectedCategory(category);
  };

  const renderItem: React.FC<{ item: FoodCategory }> = ({ item }) => (
    <Box
      style={
        selectedCategory && selectedCategory.id === item.id
          ? {
              shadowColor: theme.colors.primary,
              elevation: 15,
              shadowRadius: 1,
            }
          : undefined
      }
      spacing={{ px: 15, py: 10, my: 20 }}
      rounded={20}
      bg={selectedCategory && selectedCategory.id === item.id ? 'primary' : 'card'}
      onPress={() => handleCategorySelect(item)}
    >
      <RNText
        variant="subtitle"
        style={{ fontSize: scale(14) }}
        color={selectedCategory && selectedCategory.id === item.id ? 'white' : 'onCard'}
      >
        {item.name}
      </RNText>
    </Box>
  );

  return (
    <Box>
      <FlatList
        contentContainerStyle={{ gap: scale(10), paddingHorizontal: moderateScale(20) }}
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};

export default FoodCategories;
