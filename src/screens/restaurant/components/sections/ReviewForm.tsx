import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { CameraIcon } from '../../../../assets';
import { Box, RNButton, RNIcon, RNText } from '../../../../components/themed';
import { useAuth, useTheme } from '../../../../context';
import { scale, verticalScale } from '../../../../helpers';
import { ReviewService } from '../../../../service';
import { COLORS } from '../../../../themes';
import RateOption from '../reviews/RateOption';

import * as ImagePicker from 'expo-image-picker';

interface IreviewProp {
  restaurantId: number | string;
  handleSnapPress: (idx: number) => void;
}
const ReviewForm = ({ restaurantId, handleSnapPress }: IreviewProp) => {
  const { theme } = useTheme();
  const { addReview: addmyreview, data, isLoading, error } = ReviewService.addReview(restaurantId);

  const [images, setImages] = useState<string[]>([]);

  const { token } = useAuth();

  const [rating, setRating] = useState(0);
  const [caption, setCaption] = useState('');

  const deleteImage = (uriToDelete: string) => {
    setImages(prevImages =>
      prevImages ? prevImages.filter(image => image.uri !== uriToDelete) : []
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImages(result.assets.map(i => i.uri));
    }
  };

  const submitReviewImages = async () => {
    const formData = new FormData();

    formData.append('caption', caption);
    formData.append('restaurant_id', String(restaurantId));
    formData.append('rating', String(rating));

    if (images.length > 0) {
      images.forEach((image, index) => {
        const imageDto: any = {
          name: new Date() + '_image_' + index,
          uri: image,
          type: 'image/jpg',
        };
        formData.append(`image[${index}]`, imageDto);
      });
    }
    console.log(formData);
    addmyreview(data);
  };

  const submitReview = async () => {
    // First, submit review data
    //await submitReviewData();

    // Then, submit review images
    await submitReviewImages();
    //shut the model
    handleSnapPress(0);
  };

  /* const submitReview = () => {
    const newReview = {
      caption: caption,
      rating: rating,
      restaurant_id: restaurantId,
    };

    addmyreview({ data: newReview, token: token });
    handleSnapPress(0);
  };
 */
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
              value={caption}
              onChangeText={text => setCaption(text)}
            />
          </KeyboardAvoidingView>
        </Box>
      </Box>

      <Box alignItems="flex-start" w={'100%'} gap={8}>
        <RNText variant="subtitle">Upload Photos</RNText>

        {images && images.length > 0 ? (
          <ScrollView horizontal>
            {images.map((image, index) => (
              <Box key={index}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, margin: 5, borderRadius: 20 }}
                />
                <Box
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  bg="primary"
                  h={30}
                  w={30}
                  rounded={100}
                  onPress={() => deleteImage(image || '')}
                >
                  <RNText color="onPrimary">X</RNText>
                </Box>
              </Box>
            ))}
          </ScrollView>
        ) : (
          <Box
            bg="background"
            rounded={8}
            w={100}
            h={100}
            onPress={pickImage}
            style={{
              borderWidth: scale(1),
              borderColor: COLORS.grey[400],
              borderStyle: 'dashed',
            }}
          >
            <RNIcon color="grey.400" as={<CameraIcon />} />
          </Box>
        )}
      </Box>

      <Box
        flex={1}
        spacing={{ py: 10, px: 10 }}
        style={{
          position: 'absolute',
          bottom: verticalScale(20),
          zIndex: 1,
          left: 0,
          right: 0,
        }}
      >
        <RNButton
          style={{ width: '100%' }}
          isLoading={isLoading}
          title="submit review"
          onPress={submitReview}
        />
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
