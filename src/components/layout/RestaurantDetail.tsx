import React, { FunctionComponent } from "react";
import { TouchableOpacity, View } from "react-native";
import { styled } from "styled-components/native";
import { Palette } from "../../themes";
import { LikeButton, MenuSection } from "../../screens/restaurant/components";
import Review from "../common/review/Review";
import { ClockIcon, LocationIcon } from "../../assets";
import { MenuCategory, Restaurant } from "../../entities";
import { BackgoundContainer, Paragraph, SubTitle, Title } from "../common";

const DetailsContainer = styled(BackgoundContainer)`
  padding: 20px;
  width: 100%;
  margin-top: -30px;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  gap: 25px;
`;

const RestaurantDetails: FunctionComponent<Restaurant> = ({
  name,
  location,
  workingTime,
  description,
  rating,
  menu,
}) => {
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
        <View style={{ flex: 1 }}>
          <Title>{name}</Title>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              maxWidth: "90%",
            }}
          >
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
      <MenuSection menu={menu} />
    </DetailsContainer>
  );
};

export default RestaurantDetails;
