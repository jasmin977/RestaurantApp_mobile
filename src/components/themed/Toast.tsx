import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppState, useTheme } from '../../context';
import { moderateScale, moderateVerticalScale, scale } from '../../helpers';
import Text from './Text';
import Box from './Box';

interface ToastProps {
  title: string;

  duration: number;
}
const RNToast = ({ title, duration }: ToastProps) => {
  const { isToastVisible, setToastVisible } = useAppState();
  const { theme } = useTheme();

  // Hide the toast after the specified duration
  useEffect(() => {
    const timeout = setTimeout(() => {
      setToastVisible(false);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration]);
  if (!isToastVisible) return null;

  return (
    <Box>
      <View style={[styles.toast, { backgroundColor: theme.colors.primary }]}>
        <Text color="onPrimary" style={{ fontWeight: 'bold' }} variant="subtitle">
          {title}
        </Text>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  toast: {
    paddingVertical: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: scale(50),
  },
});
export default RNToast;
