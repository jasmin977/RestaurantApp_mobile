import { View, Image, ImageSourcePropType, FlatList, Dimensions } from 'react-native';
import React, { FunctionComponent, useState } from 'react';
import { Avatar, Box, RNText } from '../../../../components/themed';
import { AVATAR, vegyBurger } from '../../../../assets';

import { scale, timeDifference, verticalScale } from '../../../../helpers';
import { Review as ReviewModel } from '../../../../entities';
import RatingStars from '../reviews/RatingStars';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../context';
import RNModal from '../../../../components/themed/Modal';
import { BASE_URL } from '../../../../CONSTANTS';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ReviewCard = (reviw: ReviewModel) => {
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleImageClick = () => {
    setModalVisible(true);
  };
  if (!reviw) {
    return null; // or you can return some loading indicator or message
  }
  return (
    <Box flex={1} direction="horizontal" alignItems="flex-start" spacing={{ p: 20 }} gap={10}>
      <Box>
        <Avatar
          src={`http://${BASE_URL}:8000/storage/${
            reviw.user ? reviw.user.avatar : 'avatars/avatar_default.jpg'
          }`}
          size={40}
        />
        <Box h={'100%'} w={7} bg="card"></Box>
      </Box>
      <Box flex={1} alignItems="stretch" gap={5} bg="card" rounded={8} spacing={{ p: 10, mt: -25 }}>
        <Box direction="horizontal" justifyContent="space-between" flex={1}>
          <RNText variant="subtitle">{reviw.user && reviw.user.name}</RNText>
          <RNText variant="caption">
            {' '}
            {reviw.created_at && timeDifference(new Date(), new Date(reviw.created_at))}
          </RNText>
        </Box>
        <Box alignItems="flex-start">
          {reviw.rating && <RatingStars rating={reviw.rating} allStar size={20} />}
        </Box>

        {reviw.caption && <RNText variant="body">{reviw.caption}</RNText>}

        {/** HANDLING IMAGES*/}
        <Box w={'100%'}>
          {reviw.images && reviw.images?.length == 1 && (
            <Box direction="horizontal" w={'100%'} gap={2} onPress={handleImageClick}>
              <Image
                source={{
                  uri: `http://${BASE_URL}:8000/storage/${reviw.images[0].url.split('public/')[1]}`,
                }}
                style={{
                  width: '100%',

                  height: 200,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderWidth: 1,
                  borderColor: theme.colors.background,
                }}
              />
            </Box>
          )}

          {reviw.images && reviw.images?.length == 2 && (
            <Box direction="horizontal" w={'100%'} gap={2}>
              <Box w={'50%'} onPress={handleImageClick}>
                <Image
                  source={{
                    uri: `http://${BASE_URL}:8000/storage/${
                      reviw.images[0].url.split('public/')[1]
                    }`,
                  }}
                  style={{
                    width: '100%',

                    height: 200,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderWidth: 1,
                    borderColor: theme.colors.background,
                  }}
                />
              </Box>
              <Box w={'50%'} onPress={handleImageClick}>
                <Image
                  source={{
                    uri: `http://${BASE_URL}:8000/storage/${
                      reviw.images[1].url.split('public/')[1]
                    }`,
                  }}
                  style={{
                    width: '100%',

                    height: 200,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    borderWidth: 1,
                    borderColor: theme.colors.background,
                  }}
                />
              </Box>
            </Box>
          )}

          {reviw.images && reviw.images?.length > 2 && (
            <Box direction="horizontal" w={'100%'} gap={2}>
              <Box w={'60%'} onPress={handleImageClick}>
                <Image
                  source={{
                    uri: `http://${BASE_URL}:8000/storage/${
                      reviw.images[0].url.split('public/')[1]
                    }`,
                  }}
                  style={{
                    width: '100%',

                    height: 200,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderWidth: 1,
                    borderColor: theme.colors.background,
                  }}
                />
              </Box>
              <Box direction="vertical" w={'40%'} gap={2}>
                <TouchableOpacity style={{ width: '100%' }} onPress={handleImageClick}>
                  <Image
                    source={{
                      uri: `http://${BASE_URL}:8000/storage/${
                        reviw.images[1].url.split('public/')[1]
                      }`,
                    }}
                    style={{
                      width: '100%',
                      height: 100,
                      borderTopRightRadius: 10,
                      borderWidth: 1,
                      borderColor: theme.colors.background,
                    }}
                  />
                </TouchableOpacity>
                <View style={{ width: '100%' }}>
                  <Image
                    source={{
                      uri: `http://${BASE_URL}:8000/storage/${
                        reviw.images[2].url.split('public/')[1]
                      }`,
                    }}
                    style={{
                      width: '100%',
                      height: 100,
                      borderBottomRightRadius: 10,
                      borderWidth: 1,
                      borderColor: theme.colors.background,
                    }}
                  />

                  <TouchableOpacity
                    onPress={handleImageClick}
                    style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      width: '100%',
                      borderBottomRightRadius: 10,
                      height: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <RNText variant="caption" color="white">{`+${
                      reviw.images.slice(2).length - 1
                    }`}</RNText>
                  </TouchableOpacity>
                </View>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {isModalVisible && (
        <RNModal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
          <FlatList
            horizontal
            data={reviw.images}
            keyExtractor={(item, index) => index.toString()}
            pagingEnabled
            contentContainerStyle={{ gap: 5 }}
            snapToAlignment="center"
            decelerationRate={'fast'}
            renderItem={({ item }) => (
              <View
                style={{
                  width: SCREEN_WIDTH,
                  paddingVertical: 10,

                  borderRadius: 10,
                }}
              >
                <Image
                  source={{
                    uri: `http://${BASE_URL}:8000/storage/${item.url.split('public/')[1]}`,
                  }}
                  style={{
                    width: SCREEN_WIDTH,
                    height: '100%',
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </View>
            )}
          />
        </RNModal>
      )}
    </Box>
  );
};

export default ReviewCard;
