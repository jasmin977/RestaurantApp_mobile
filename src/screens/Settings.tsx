import { FunctionComponent } from 'react';
import { BackgoundContainer, CenteredView } from '../components/common';
import { RNText } from '../components/themed';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../hooks';

interface SettingsProps {}

const Settings: FunctionComponent<SettingsProps> = () => {
  const { theme, toggleTheme, isDarkTheme } = useTheme();

  return (
    <BackgoundContainer>
      <CenteredView>
        <View style={{ backgroundColor: theme.colors.card }}>
          <TouchableOpacity onPress={toggleTheme}>
            <RNText spacing={{ p: 10 }} color="onSurface">
              {theme.mode}
            </RNText>
          </TouchableOpacity>
        </View>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Settings;
