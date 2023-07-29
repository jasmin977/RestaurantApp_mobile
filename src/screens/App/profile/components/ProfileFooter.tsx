// ProfileFooter.tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Box } from '../../../../components/themed';
import { COLORS } from '../../../../themes';

interface ProfileFooterProps {
  isLoading: boolean;
}

const ProfileFooter: React.FC<ProfileFooterProps> = ({ isLoading }) => {
  return (
    <View style={{ paddingBottom: 50 }}>
      {isLoading && (
        <Box alignItems="center" paddingTop={10}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </Box>
      )}
    </View>
  );
};

export default ProfileFooter;
