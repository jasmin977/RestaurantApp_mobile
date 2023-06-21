import { Palette } from "../../themes";
import { styled } from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BackIcon } from "../../assets";
import { RestaurantStackParamList } from "../../navigators";
import { BackgoundContainer, GoBackButton } from "../../components/common";
import { RestaurantDetails } from "../../components/layout";
interface RestaurantProfileScreenProps {}

const RestaurantImage = styled.Image`
  width: 100%;
  height: 300px;
`;

const StyledScrollView = styled.ScrollView`
  background-color: ${Palette.background};
  flex: 1;
`;

type RestaurantProps = NativeStackScreenProps<
  RestaurantStackParamList,
  "RestaurantProfile"
>;

const RestaurantProfileScreen = ({ route, navigation }: RestaurantProps) => {
  const restaurantObject = route.params.restoData;

  return (
    <StyledScrollView>
      <BackgoundContainer>
        <GoBackButton onPress={() => navigation.goBack()}>
          <BackIcon />
        </GoBackButton>

        <RestaurantImage resizeMode="cover" source={restaurantObject.img} />
        <RestaurantDetails {...restaurantObject} />
      </BackgoundContainer>
    </StyledScrollView>
  );
};

export default RestaurantProfileScreen;
