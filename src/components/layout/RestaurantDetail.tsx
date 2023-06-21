import React, { FunctionComponent, useState } from "react";
import { TouchableOpacity, View, FlatList } from "react-native";
import { styled } from "styled-components/native";
import { Palette } from "../../themes";
import { LikeButton } from "../../screens/restaurant/components";
import Review from "../common/review/Review";
import { ClockIcon, LocationIcon } from "../../assets";
import { MenuCategory, Restaurant } from "../../entities";
import {
  BackgoundContainer,
  MealCard,
  Paragraph,
  SubTitle,
  Title,
} from "../common";

const DetailsContainer = styled(BackgoundContainer)`
  padding: 20px;
  width: 100%;
  margin-top: -30px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  gap: 25px;
`;

const MenuItemsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 15px;
`;

const mostPopularCategory: MenuCategory = {
  category: "Most Popular",
  items: [],
};

const getCategoryItems = (categoryName: string, menu: MenuCategory[]) => {
  if (categoryName === "Most Popular") {
    return menu.flatMap((category) => category.items);
  }
  const category = menu.find((item) => item.category === categoryName);
  return category ? category.items : [];
};

const RestaurantDetails: FunctionComponent<Restaurant> = ({
  name,
  location,
  workingTime,
  description,
  rating,
  menu,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Most Popular"
  );
  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <DetailsContainer>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Title>{name}</Title>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <LocationIcon color={Palette.text} />
            <SubTitle>{location}</SubTitle>
          </View>
        </View>
        <LikeButton onPress={() => console.log()} />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{ alignItems: "flex-start" }}
      >
        <Review rating={rating} detailled />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <ClockIcon outline />
        <Title textStyle={{ fontSize: 15 }}>Opened Now</Title>
        <SubTitle textStyle={{ fontSize: 18 }}>{workingTime}</SubTitle>
      </View>
      <Paragraph>{description}</Paragraph>

      {/** menu */}
      <View>
        <FlatList
          data={[mostPopularCategory, ...menu]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 20, paddingVertical: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCategoryPress(item.category)}
            >
              <SubTitle
                textStyle={[
                  { fontSize: 20, color: Palette.text },
                  selectedCategory === item.category && {
                    color: Palette.PrimaryColor,
                  },
                ]}
              >
                {item.category}
              </SubTitle>
            </TouchableOpacity>
          )}
          keyExtractor={(item: MenuCategory) => item.category}
        />
        <MenuItemsContainer>
          {selectedCategory &&
            getCategoryItems(selectedCategory, menu).map((item) => (
              <MealCard
                name={item.name}
                rating={item.rating}
                key={`${item.name}_${item.description}`}
              />
            ))}
        </MenuItemsContainer>
      </View>
    </DetailsContainer>
  );
};

export default RestaurantDetails;
