import { useTheme } from '../../context';
import { BackgoundContainer, CenteredView } from '../../components/common';
import { RNButton, RNIcon } from '../../components/themed';
import { BackIcon } from '../../assets';
import { RootNavigationProps } from '../../navigators/stacks/BotoomTab';

interface SettingsProps {}

const Settings = ({ route, navigation }: RootNavigationProps) => {
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
          centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
        />

        <RNButton onPress={toggleTheme} title={`${theme.mode}`} />
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Settings;
