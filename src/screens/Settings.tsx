import { FunctionComponent } from 'react';
import { BackgoundContainer, CenteredView } from '../components/common';
import { RNButton, RNIcon, RNText } from '../components/themed';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks';
import { BackIcon } from '../assets';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { HomeStackParamList } from '../navigators/stacks/Home';

interface SettingsProps {}

type Props = NativeStackScreenProps<HomeStackParamList, 'Settings'>;
const Settings = ({ route, navigation }: Props) => {
  const { theme, toggleTheme, isDarkTheme } = useTheme();

  return (
    <BackgoundContainer>
      <CenteredView>
        <RNButton
          size="sm"
          style={{
            position: 'absolute',
            top: 40,
            left: 20,
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
          onPress={() => navigation.goBack()}
          centerIcon={
            <RNIcon outline={true} color="white">
              <BackIcon />
            </RNIcon>
          }
        />

        <RNButton onPress={toggleTheme} title={`${theme.mode}`} />
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Settings;
