import React, { FunctionComponent, useEffect, useState } from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity } from 'react-native';
import { BackgoundContainer } from '../../components/common';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../../components/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RestaurantStackParamList } from '../../navigators/stacks';
import {
  AVATAR,
  BackIcon,
  peperoniPizza,
  rest_1,
  salad,
  vegeterianPizza,
  vegyBurger,
} from '../../assets';
import CenteredContainer from '../../components/common/containers/Centered';
import { RateOption, RatingStars, ReviewCard, ReviewForm, StarPercentage } from './components';
import { styled } from 'styled-components/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootBottomStackParamList } from '../../navigators/RootStack';
import RNModal from '../../components/themed/Modal';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../hooks';
import { RootNavigationProps } from '../../navigators/Drawer';
import { StatusBar } from 'expo-status-bar';

type Props = NativeStackScreenProps<RestaurantStackParamList, 'AddReview'>;

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

const AddReviewScreen = ({ route }: Props) => {
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);
  const navigation = useNavigation<RootNavigationProps['navigation']>();
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: 'none' },
      });
    }, [])
  );
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <BackgoundContainer>
      <StyledScrollView stickyHeaderIndices={[0]}>
        <Box
          bg="background"
          direction="horizontal"
          spacing={{ px: 20, py: 5 }}
          gap={10}
          justifyContent="space-between"
        >
          <RNButton
            size="sm"
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
            onPress={() => navigation.goBack()}
            centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
          />
          <RNText variant="subtitle">add a review</RNText>
          <Box></Box>
        </Box>

        <Box alignItems="flex-start" gap={20} spacing={{ px: 20, mt: 30 }}>
          <Box alignItems="flex-start" w={'100%'}>
            <RNText variant="subtitle">What's your rate?</RNText>
            <RateOption rating={rating} setRating={setRating} />
          </Box>

          <Box alignItems="flex-start" w={'100%'} gap={8}>
            <RNText variant="subtitle">Your comment</RNText>
            <Box spacing={{ p: 10 }} bg="card" rounded={8} w={'100%'} alignItems="flex-start">
              <KeyboardAvoidingView
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -200}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              >
                <TextInput
                  multiline
                  style={[styles.textArea, { color: theme.colors.onCard }]}
                  placeholder="write your comment here.."
                  placeholderTextColor={theme.colors.onCard}
                />
              </KeyboardAvoidingView>
            </Box>
          </Box>

          <Box alignItems="flex-start" w={'100%'} gap={8}>
            <RNText variant="subtitle">Upload Photos</RNText>
            <Box
              bg="card"
              rounded={8}
              w={100}
              h={100}
              onPress={() => console.log('img')}
              style={{
                borderWidth: 1,
                borderColor: theme.colors.card,
                borderStyle: 'dashed',
              }}
            ></Box>
          </Box>
        </Box>
      </StyledScrollView>
      <Box
        flex={1}
        spacing={{ py: 10, px: 10 }}
        bg="background"
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
          left: 0,
          right: 0,
        }}
      >
        <RNButton style={{ width: '100%' }} title="Leave a review" onPress={() => openModal()} />
      </Box>
      <RNModal isOpen={isOpen} onClose={closeModal}>
        <Box gap={20}>
          <RNText> Thank you for your feedback.</RNText>
          <RNText> 💖</RNText>
          <RNText align="center"> We apperciate your review. Please continue to support us.</RNText>
        </Box>
      </RNModal>
    </BackgoundContainer>
  );
};
const styles = StyleSheet.create({
  textArea: {
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
    padding: 0,
  },
});
export default AddReviewScreen;
