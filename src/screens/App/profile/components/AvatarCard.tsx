import { View, Text, Animated, Image, Dimensions } from 'react-native';
import React from 'react';
import { Box } from '../../../../components/themed';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../themes';
import { BASE_URL } from '../../../../CONSTANTS';
const { width } = Dimensions.get('window');

const AVATAR_SIZE = 100;
const SPACING = 10;
const SPACE_AVATAR_SIZE = (width - AVATAR_SIZE) / 2;
const AvatarCard = ({
  item,
  index,
  selectedItemIndex,
  scrollX,
}: {
  item: string;
  index: number;
  selectedItemIndex: number;
  scrollX: any;
}) => {
  const inputRange = [(index - 2) * AVATAR_SIZE, (index - 1) * AVATAR_SIZE, index * AVATAR_SIZE];

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [0, -50, 0],
  });

  if (!item) {
    return <Box w={SPACE_AVATAR_SIZE} h={AVATAR_SIZE} />;
  }
  const isCenterItem = index === selectedItemIndex;

  return (
    <View style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}>
      <Animated.View
        style={[
          styles.avatarContainer,
          { transform: [{ translateY }] },
          isCenterItem && styles.centerItem,
        ]}
      >
        <Image
          style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
          resizeMode="contain"
          source={{ uri: `http://${BASE_URL}:8000/storage/${item}` }}
        />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  centerItem: {
    borderWidth: 3,
    borderColor: COLORS.primary,
    elevation: 10,
    shadowColor: COLORS.primary,
  },
});
export default AvatarCard;
