import { FunctionComponent, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import assets, { QRcodeIcon } from '../../../assets';
import { useTheme } from '../../../hooks';
import LottieView from 'lottie-react-native';
import { StateContext } from '../../../context';
import { RNIcon } from '../../themed';

const ScanButton: FunctionComponent = () => {
  const { theme } = useTheme();
  const { isScanned, scanQRcode } = useContext(StateContext);
  const Scannig_qr_code_color_filters = [
    {
      keypath: 'qr-code Outlines 2',
      color: theme.colors.white,
    },
    {
      keypath: 'qr-code Outlines',
      color: theme.colors.white,
    },
    {
      keypath: 'scan light',
      color: theme.colors.primary,
    },
  ];
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
