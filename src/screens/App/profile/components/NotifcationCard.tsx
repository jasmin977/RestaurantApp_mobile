import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from '../../../../context';
import { Avatar, Box, RNIcon, RNText } from '../../../../components/themed';
import NotificationService from '../../../../service/Notifications';
import { Notification } from '../../../../entities';
import { ThumbDown, ThumbUp, Comment } from '../../../../assets';
import { timeDifference } from '../../../../helpers';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from '../../../../navigators/ROUTES';
import { RestaurantNavigationProps } from '../../../../navigators/stacks';

const getIconByType = (type: Notification['type']) => {
  switch (type) {
    case 'App\\Notifications\\UserFollowed':
      return <RNIcon size={18} as={<ThumbUp />} />;
    case 'App\\Notifications\\addReviewNotification':
      return <RNIcon size={18} as={<ThumbDown />} />;
    case 'App\\Notifications\\MealAddedNotification':
      return <RNIcon size={18} as={<Comment />} />;
    case `promotion`:
      return null;
    case 'mention':
      return <RNIcon size={18} as={<Comment />} />;
    default:
      return null;
  }
};

const NotifcationCard = ({ item }: { item: Notification }) => {
  const { mutate: markasread, data, isLoading, error } = NotificationService.useMarkAsReadNotif();
  const { token } = useAuth();
  const navigation = useNavigation<RootNavigationProps['navigation']>();

  const navigateto = (type: Notification['type'], id: string | number) => {
    switch (type) {
      case 'App\\Notifications\\UserFollowed':
        return navigation.navigate('Profile', { id: id });
      case 'App\\Notifications\\addReviewNotification':
        return navigation.navigate('Profile', { id: id });

      case 'App\\Notifications\\MealAddedNotification':
        return navigation.push('RestaurantStack', {
          screen: 'RestaurantProfile',
          params: {
            id: id,
          },
        });

      default:
        return null;
    }
  };
  return (
    <Box
      direction="horizontal"
      w={'100%'}
      gap={5}
      bg={item.read_at ? 'background' : 'card'}
      spacing={{ p: 10 }}
      rounded={10}
      onPress={() => {
        if (item.read_at) {
          console.log('navigate to');
          navigateto(item.type, item.id);
        } else {
          markasread({ id: item.id, token: token });
          if (!isLoading && data && !error) {
            navigateto(item.type, item.data.id);
            console.log('navigate to');
          }
        }
      }}
    >
      <Box direction="horizontal" w={'20%'}>
        <Avatar />
        {getIconByType(item.type) && (
          <Box
            bg="background"
            spacing={{ p: 5 }}
            rounded={50}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              shadowColor: 'grey',
              elevation: 10,
            }}
          >
            {getIconByType(item.type)}
          </Box>
        )}
      </Box>

      <Box alignItems="flex-start" w={'80%'}>
        <Box direction="horizontal" gap={5} justifyContent="flex-start">
          <RNText> {item.data.message}</RNText>
        </Box>
        <RNText variant="caption">{timeDifference(new Date(), new Date(item.created_at))}</RNText>
      </Box>
    </Box>
  );
};

export default NotifcationCard;
