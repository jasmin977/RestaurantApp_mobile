import { View, Text, SectionList, Image } from 'react-native';
import React from 'react';

import { BackgoundContainer } from '../../components/common';
import { Avatar, Box, RNButton, RNIcon, RNText } from '../../components/themed';
import { AVATAR, Comment, LikeIcon, ThumbDown, ThumbUp } from '../../assets';
import { moderateScale, moderateVerticalScale, scale, timeDifference } from '../../helpers';

interface Notification {
  id: number;
  type: 'like' | 'dislike' | 'comment' | 'follow' | 'mention';
  date: Date;
  owner: string;
}
const notificationData: Notification[] = [
  {
    id: 1,
    type: 'like',
    date: new Date(), // Current date and time
    owner: 'John Doe',
  },
  {
    id: 2,
    type: 'follow',
    date: new Date(), // Current date and time
    owner: 'Jane Smith',
  },
  {
    id: 3,
    type: 'comment',
    date: new Date(), // Current date and time
    owner: 'Alex Johnson',
  },
  {
    id: 4,
    type: 'mention',
    date: new Date(), // Current date and time
    owner: 'Emily Brown',
  },
  {
    id: 5,
    type: 'dislike',
    date: new Date(), // Current date and time
    owner: 'Michael Wilson',
  },
  {
    id: 6,
    type: 'follow',
    date: new Date(), // Current date and time
    owner: 'Samantha Davis',
  },
  {
    id: 7,
    type: 'like',
    date: new Date('2022-01-15T09:30:00Z'), // An example of a past date
    owner: 'David Johnson',
  },
  {
    id: 8,
    type: 'mention',
    date: new Date('2023-07-01T14:45:00Z'), // An example of a past date
    owner: 'Sophia Wilson',
  },
  {
    id: 17,
    type: 'like',
    date: new Date('2022-01-15T09:30:00Z'), // An example of a past date
    owner: 'David Johnson',
  },
  {
    id: 18,
    type: 'mention',
    date: new Date('2022-12-01T14:45:00Z'), // An example of a past date
    owner: 'Sophia Wilson',
  },
  {
    id: 71,
    type: 'like',
    date: new Date('2023-01-15T09:30:00Z'), // An example of a past date
    owner: 'David Johnson',
  },
  {
    id: 81,
    type: 'mention',
    date: new Date('2023-05-01T14:45:00Z'), // An example of a past date
    owner: 'Sophia Wilson',
  },
  // Add more notifications as needed
];
const getSectionTitle = (date: Date): string => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(now);
  lastWeek.setDate(lastWeek.getDate() - 7);
  const lastMonth = new Date(now);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastYear = new Date(now);
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  if (date.getTime() > now.getTime()) {
    return 'NOW';
  } else if (date.setHours(0, 0, 0, 0) >= now.setHours(0, 0, 0, 0)) {
    return 'TODAY';
  } else if (date.setHours(0, 0, 0, 0) >= yesterday.setHours(0, 0, 0, 0)) {
    return 'YESTERDAY';
  } else if (date.setHours(0, 0, 0, 0) >= lastWeek.setHours(0, 0, 0, 0)) {
    return 'LAST WEEK';
  } else if (date.setHours(0, 0, 0, 0) >= lastMonth.setHours(0, 0, 0, 0)) {
    return 'LAST MONTHY';
  } else {
    return 'LAST YEAR';
  }
};
const Notifications = () => {
  const sections: { title: string; data: Notification[] }[] = [];
  notificationData.forEach(notification => {
    const sectionTitle = getSectionTitle(notification.date);
    const sectionIndex = sections.findIndex(section => section.title === sectionTitle);
    if (sectionIndex === -1) {
      sections.push({ title: sectionTitle, data: [notification] });
    } else {
      sections[sectionIndex].data.push(notification);
    }
  });

  // Function to determine the time category based on the notification date
  const getTimeCategory = (date: Date): string => {
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const startOfToday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const startOfThisWeek = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - currentDate.getDay()
    );
    const startOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);

    if (date > currentDate) {
      return 'Just Now';
    } else if (date > startOfToday) {
      return 'Today';
    } else if (date > yesterday) {
      return 'Yesterday';
    } else if (date > startOfThisWeek) {
      return 'This Week';
    } else if (date > startOfLastMonth) {
      return 'Last Month';
    }

    // Return a fallback category if the date does not fall into any specific category
    return 'Other';
  };

  const getIconByType = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <RNIcon size={18} as={<ThumbUp />} />;
      case 'dislike':
        return <RNIcon size={18} as={<ThumbDown />} />;
      case 'comment':
        return <RNIcon size={18} as={<Comment />} />;
      case 'follow':
        return null;
      case 'mention':
        return <RNIcon size={18} as={<Comment />} />;
      default:
        return null;
    }
  };

  const getNotifTextByType = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return 'liked your review';
      case 'dislike':
        return 'disliked your review';
      case 'comment':
        return 'commented on your review';
      case 'follow':
        return 'followed you';
      case 'mention':
        return 'mentioned you in a comment';
      default:
        return null;
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Box direction="horizontal" w={'100%'} gap={5} onPress={() => console.log('notif')}>
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
          <RNText>
            {item.owner} {getNotifTextByType(item.type)}
          </RNText>
        </Box>
        <RNText>{timeDifference(new Date(), item.date)}</RNText>
      </Box>
    </Box>
  );

  const renderSectionHeader = ({
    section,
  }: {
    section: { title: string; data: Notification[] };
  }) => (
    <View>
      <RNText variant="subtitle">{section.title}</RNText>
    </View>
  );

  return (
    <BackgoundContainer>
      <Box spacing={{ py: 20 }}>
        <RNText variant="subtitle" style={{ fontSize: scale(22) }}>
          Notification
        </RNText>
      </Box>
      <SectionList
        sections={sections}
        contentContainerStyle={{
          gap: 40,
          paddingHorizontal: moderateScale(20),
          paddingTop: moderateVerticalScale(20),
          paddingBottom: moderateVerticalScale(50),
        }}
        data={notificationData}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderNotification}
        keyExtractor={item => item.id.toString()}
      />
    </BackgoundContainer>
  );
};

export default Notifications;
