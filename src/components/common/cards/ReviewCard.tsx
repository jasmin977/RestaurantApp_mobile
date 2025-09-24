import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../context';
import { RootNavigationProps } from '../../../navigators/ROUTES';
import { Review } from '../../../entities';
import { Avatar, Box, RNIcon, RNText } from '../../../components/themed';
import { timeDifference, verticalScale } from '../../../helpers';
import { Comment, EllipsisIcon, ThumbDown, ThumbUp, Share, AVATAR } from '../../../assets';
import { RatingStars } from '../../../screens/restaurant/components';
import RNModal from '../../themed/Modal';
import { FlatList } from 'react-native';
import { BASE_URL } from '../../../CONSTANTS';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ReviewCard(item: Review) {
  const { theme } = useTheme();
  const [isLike, setLike] = useState(false);
  const [isDilLike, setisDilLike] = useState(false);
  const navigation = useNavigation<RootNavigationProps['navigation']>();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleImageClick = () => {
    setModalVisible(true);
  };
  if (!item) {
    return (
      <Box>
        <RNText>Loading review data...</RNText>
      </Box>
    );
  }

  return (
    <Box bg="card" rounded={10} spacing={{ mx: 20 }}>
      {/** CARD HEADER */}
      <Box
        w={'100%'}
        justifyContent="space-between"
        direction="horizontal"
        spacing={{ py: 10, px: 15 }}
        style={{ borderBottomWidth: 1, borderColor: theme.colors.background }}
      >
        <Box direction="horizontal">
          <TouchableOpacity onPress={() => navigation.navigate('Profile', { id: item?.user?.id })}>
            <Avatar src={`http://${BASE_URL}:8000/storage/${item?.user?.avatar}`} />
          </TouchableOpacity>
          <Box alignItems="flex-start" spacing={{ px: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile', { id: item?.user?.id })}
            >
              <RNText variant="h5">{item?.user?.name}</RNText>
            </TouchableOpacity>
            <RNText variant="caption">
              {item?.created_at && timeDifference(new Date(), new Date(item.created_at))}
            </RNText>
          </Box>
        </Box>
        <RNIcon color="onCard" outline as={<EllipsisIcon />} />
      </Box>

      {/** CARD CONTAINER */}
      <Box gap={15} w={'100%'} spacing={{ py: 15, px: 15 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('RestaurantStack', {
              screen: 'RestaurantProfile',
              params: {
                id: item?.restaurant?.id,
              },
            });
          }}
        >
          <RNText variant="h4">{item?.restaurant?.name}</RNText>
        </TouchableOpacity>
        <RatingStars size={35} rating={item.rating} allStar />
        <RNText variant="body">{item.caption}</RNText>

        {/** IMAGES */}
        <Box w={'100%'}>
          {item.images && item.images?.length == 1 && (
            <Box direction="horizontal" w={'100%'} gap={2} onPress={handleImageClick}>
              <Image
                source={{
                  uri: `http://${BASE_URL}:8000/storage/${item.images[0].url.split('public/')[1]}`,
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

          {item.images && item.images?.length == 2 && (
            <Box direction="horizontal" w={'100%'} gap={2}>
              <Box w={'50%'} onPress={handleImageClick}>
                <Image
                  source={{
                    uri: `http://${BASE_URL}:8000/storage/${
                      item.images[0].url.split('public/')[1]
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
                      item.images[1].url.split('public/')[1]
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

          {item.images && item.images?.length > 2 && (
            <Box direction="horizontal" w={'100%'} gap={2}>
              <Box w={'60%'} onPress={handleImageClick}>
                <Image
                  source={{
                    uri: `http://${BASE_URL}:8000/storage/${
                      item.images[0].url.split('public/')[1]
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
                        item.images[1].url.split('public/')[1]
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
                        item.images[2].url.split('public/')[1]
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
                      item.images.slice(2).length - 1
                    }`}</RNText>
                  </TouchableOpacity>
                </View>
              </Box>
            </Box>
          )}
        </Box>

        {/* <Box
          w={'100%'}
          direction="horizontal"
          justifyContent="space-between"
          bg="background"
          rounded={8}
          spacing={{ px: 10, py: 5 }}
        >
          <Box alignItems="flex-start" w={'50%'}>
            <RNText variant="subtitle">Gategory</RNText>
            <RNText variant="caption">Food & Drink</RNText>
          </Box>
          <Box alignItems="flex-start" w={'50%'}>
            <RNText variant="subtitle">Location</RNText>
            <RNText variant="caption">{item.restaurant.streetAddress}</RNText>
          </Box>
        </Box> */}
        <Box w={'100%'} direction="horizontal" justifyContent="space-around">
          <Box gap={10} onPress={() => setLike(!isLike)}>
            <RNIcon color={isLike ? 'primary' : 'grey.600'} as={<ThumbUp />} />
            {/*  <RNText
              color={isLike ? 'primary' : 'onCard'}
              style={{ fontWeight: 'bold' }}
              variant="caption"
            >
              0
            </RNText> */}
          </Box>
          <Box gap={10} onPress={() => setisDilLike(!isDilLike)}>
            <RNIcon color={isDilLike ? 'primary' : 'grey.600'} as={<ThumbDown />} />
            {/*  <RNText
              color={isDilLike ? 'primary' : 'onCard'}
              style={{ fontWeight: 'bold' }}
              variant="caption"
            >
             0
            </RNText> */}
          </Box>
          <Box gap={10}>
            <RNIcon color="grey.600" as={<Comment />} />
            {/*   <RNText variant="caption" style={{ fontWeight: 'bold' }}>
              0
            </RNText> */}
          </Box>
          <Box gap={10}>
            <RNIcon color="grey.600" as={<Share />} />
            {/*  <RNText variant="caption" style={{ fontWeight: 'bold' }}>
              0
            </RNText> */}
          </Box>
        </Box>
      </Box>
      {isModalVisible && (
        <RNModal isOpen={isModalVisible} onClose={() => setModalVisible(false)}>
          <FlatList
            horizontal
            data={item.images}
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
}
