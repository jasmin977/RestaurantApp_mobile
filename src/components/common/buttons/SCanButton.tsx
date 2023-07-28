import { FunctionComponent } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QRcodeIcon } from '../../../assets';

import { useTheme } from '../../../context';
import { Box, RNIcon } from '../../themed';
import { scale } from '../../../helpers';

const ScanButton: FunctionComponent = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        width: scale(60),
        height: scale(60),
      }}
    >
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primary]}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: scale(30),
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: theme.colors.primary,
          elevation: 15,
          shadowRadius: 1,
        }}
      >
        <RNIcon color="white" size={45} as={<QRcodeIcon />} />
      </LinearGradient>
    </View>
  );
};

export default ScanButton;
