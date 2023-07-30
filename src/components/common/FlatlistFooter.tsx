import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Box } from '../themed';
import { COLORS } from '../../themes';

interface FlatlistFooterProps {
  isLoading: boolean;
}

const FlatlistFooter: React.FC<FlatlistFooterProps> = ({ isLoading }) => {
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

export default FlatlistFooter;
