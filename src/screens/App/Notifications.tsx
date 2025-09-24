import { View, Text, SectionList, RefreshControl } from 'react-native';
import React, { useState } from 'react';

import { BackgoundContainer, Loader } from '../../components/common';
import { Avatar, Box, RNButton, RNIcon, RNText } from '../../components/themed';
import { Comment, ThumbDown, ThumbUp } from '../../assets';
import { moderateScale, moderateVerticalScale, scale, timeDifference } from '../../helpers';

import NotificationService from '../../service/Notifications';
import { useAuth } from '../../context';
import CenteredContainer from '../../components/common/containers/Centered';
import { Notification } from '../../entities';
import NotifcationCard from './profile/components/NotifcationCard';

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

const renderSectionHeader = ({ section }: { section: { title: string; data: Notification[] } }) => (
  <View>
    <RNText variant="subtitle">{section.title}</RNText>
  </View>
);

const Notifications = () => {
  const { token } = useAuth();

  const {
    data: notifications,
    isLoading,
    error,
    isFetching,
    refetch,
  } = NotificationService.useFetchNotifcations(token);
  NotificationService.useFetchUnreadNotifcations(token);

  const sections: { title: string; data: Notification[] }[] = [];
  if (isLoading) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <Loader size={200} />
        </CenteredContainer>
      </BackgoundContainer>
    );
  }
  if (error) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>error</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }
  if (notifications.data.notifications.length == 0) {
    return (
      <BackgoundContainer>
        <CenteredContainer>
          <RNText>No notification yet.</RNText>
        </CenteredContainer>
      </BackgoundContainer>
    );
  }

  notifications.data.notifications.forEach((notification: Notification) => {
    const sectionTitle = getSectionTitle(new Date(notification.created_at));

    const sectionIndex = sections.findIndex(section => section.title === sectionTitle);
    if (sectionIndex === -1) {
      sections.push({ title: sectionTitle, data: [notification] });
    } else {
      sections[sectionIndex].data.push(notification);
    }
  });

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
          gap: 10,
          paddingHorizontal: moderateScale(20),
          paddingTop: moderateVerticalScale(20),
          paddingBottom: moderateVerticalScale(50),
        }}
        data={notifications.data.notifications}
        renderSectionHeader={renderSectionHeader}
        renderItem={NotifcationCard}
        keyExtractor={item => item.id.toString()}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
      />
    </BackgoundContainer>
  );
};

export default Notifications;
