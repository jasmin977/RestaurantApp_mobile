import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../../../context';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../../../components/themed';
import RateOption from './RateOption';
import { COLORS } from '../../../themes';
import { CameraIcon } from '../../../assets';
import { scale, verticalScale } from '../../../helpers';

const ReviewForm = () => {
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);

  return (
    <Box flex={1} alignItems="flex-start" justifyContent="flex-start" gap={20} spacing={{ p: 20 }}>
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
              placeholderTextColor={COLORS.grey[400]}
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
          style={{
            borderWidth: scale(1),
            borderColor: COLORS.grey[400],
            borderStyle: 'dashed',
          }}
        >
          <RNIcon color="grey.400" as={<CameraIcon />} />
        </Box>
      </Box>

      <Box
        flex={1}
        spacing={{ py: 10, px: 10 }}
        style={{
          position: 'absolute',
          bottom: 20,
          zIndex: 1,
          left: 0,
          right: 0,
        }}
      >
        <RNButton style={{ width: '100%' }} title="submit review" />
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  textArea: {
    fontSize: scale(16),
    textAlignVertical: 'top',
    minHeight: verticalScale(100),
  },
});
export default ReviewForm;
