import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../../hooks';
import { Box, RNButton, RNInput, RNText } from '../../../components/themed';
import RateOption from './RateOption';

interface StarPercentage {
  star: number;
  percentage: number;
}

const ReviewForm = () => {
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);

  return (
    <Box alignItems="flex-start" gap={20} spacing={{ px: 10 }}>
      <Box alignItems="flex-start">
        <RNText variant="subtitle">What's your rate?</RNText>
        <RateOption rating={rating} setRating={setRating} />
      </Box>

      <Box alignItems="flex-start" w={'100%'} gap={8}>
        <RNText variant="subtitle">Your comment</RNText>
        <Box spacing={{ p: 10 }} bg="background" rounded={8} w={'100%'} alignItems="flex-start">
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
          bg="background"
          rounded={8}
          w={100}
          h={100}
          onPress={() => console.log('img')}
          style={{ borderWidth: 1, borderColor: theme.colors.background, borderStyle: 'dashed' }}
        ></Box>
      </Box>

      <RNButton title="submit review" style={{ width: '100%' }} />
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  textArea: {
    fontSize: 16,
    textAlignVertical: 'top',
    minHeight: 100,
    padding: 0,
  },
});
export default ReviewForm;
