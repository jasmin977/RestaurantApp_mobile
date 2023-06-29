import { FunctionComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QRcodeIcon } from '../../../assets';
import { useTheme } from '../../../hooks';
import { RNIcon } from '../../themed';

const ScanButton: FunctionComponent = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        width: 60,
        height: 60,

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primary]}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <RNIcon size={45} children={<QRcodeIcon />} />
      </LinearGradient>
    </View>
  );
};

export default ScanButton;
