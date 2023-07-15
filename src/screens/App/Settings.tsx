import { useTheme } from '../../context';
import { BackgoundContainer, CenteredView } from '../../components/common';
import { Box, RNButton, RNIcon, RNText } from '../../components/themed';
import {
  BackIcon,
  ChevronRightIcon,
  GlobeIcon,
  MoonIcon,
  LocationIcon,
  Comment,
  PaymentIcon,
  UserIcon,
  ShieldCheckIcon,
  BlockIcon,
} from '../../assets';
import { RootNavigationProps } from '../../navigators/ROUTES';
import { View, Switch, SectionList } from 'react-native';
import Accordion from '../../components/themed/Accordian';
interface SettingsProps {}

interface SettingItem {
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  title: string;
}

const Settings = ({ route, navigation }: RootNavigationProps) => {
  const { theme, toggleTheme, isDarkTheme } = useTheme();

  const data: { title: string; data: SettingItem[] }[] = [
    {
      title: 'Account Settings',
      data: [
        {
          leftIcon: <RNIcon outline as={<UserIcon />} />,
          rightIcon: <RNIcon outline as={<ChevronRightIcon />} />,
          title: 'Profile',
        },
        {
          leftIcon: <RNIcon outline as={<PaymentIcon />} />,
          rightIcon: <RNIcon outline as={<ChevronRightIcon />} />,
          title: 'Payment',
        },
      ],
    },
    {
      title: 'SECURITY',
      data: [
        {
          leftIcon: <RNIcon outline as={<ShieldCheckIcon />} />,
          rightIcon: <RNIcon outline as={<ChevronRightIcon />} />,
          title: 'Password',
        },
      ],
    },
    {
      title: 'PRIVACY',
      data: [
        {
          leftIcon: <RNIcon outline as={<BlockIcon />} />,
          rightIcon: <RNIcon outline as={<ChevronRightIcon />} />,
          title: 'Blocking',
        },
        {
          leftIcon: <RNIcon outline as={<LocationIcon />} />,
          rightIcon: <RNIcon outline as={<ChevronRightIcon />} />,
          title: 'Location',
        },
        {
          leftIcon: <RNIcon outline as={<Comment />} />,
          rightIcon: <RNIcon outline as={<ChevronRightIcon />} />,
          title: 'Active Status',
        },
      ],
    },
    {
      title: 'Preferences',
      data: [
        {
          leftIcon: <RNIcon outline as={<GlobeIcon />} />,
          rightIcon: (
            <Box direction="horizontal">
              <RNText variant="caption" style={{ fontSize: 18 }}>
                English
              </RNText>
              <RNIcon outline as={<ChevronRightIcon />} />
            </Box>
          ),
          title: 'Language',
        },
        {
          leftIcon: <RNIcon outline={!isDarkTheme} as={<MoonIcon />} />,
          rightIcon: (
            <Switch
              trackColor={{ false: '#3e3e3e', true: '#f4f3f4' }}
              thumbColor={isDarkTheme ? '#3e3e3e' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleTheme}
              value={isDarkTheme}
            />
          ),
          title: 'Dark Mode',
        },
      ],
    },
  ];

  const renderItem = ({ item }: { item: SettingItem }) => {
    return (
      <Box
        direction="horizontal"
        justifyContent="space-between"
        spacing={{ px: 20 }}
        onPress={() => console.log('seeintg')}
      >
        <Box direction="horizontal" gap={5}>
          {item.leftIcon}
          <RNText variant="subtitle" style={{ fontSize: 18 }}>
            {item.title}
          </RNText>
        </Box>
        {item.rightIcon}
      </Box>
    );
  };

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => {
    return (
      <Box bg="card" spacing={{ py: 10, px: 20 }} alignItems="flex-start">
        <RNText variant="subtitle">{title}</RNText>
      </Box>
    );
  };
  const items = [
    {
      key: 'Item 1',
      value: false,
    },
    {
      key: 'Item 2',
      value: false,
    },
    {
      key: 'Item 3',
      value: false,
    },
  ];

  return (
    <BackgoundContainer>
      <Box
        bg="background"
        direction="horizontal"
        justifyContent="space-between"
        spacing={{ px: 20, py: 10 }}
      >
        <RNButton
          size="sm"
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}
          onPress={() => navigation.goBack()}
          centerIcon={<RNIcon outline={true} color="white" as={<BackIcon />} />}
        />
        <RNText variant="subtitle" style={{ fontSize: 22 }}>
          Settings
        </RNText>
        <Box />
      </Box>
      {/*  <Accordion data={items} title="Accordion Title" /> */}
      <SectionList
        sections={data}
        contentContainerStyle={{
          gap: 30,
          paddingVertical: 20,
        }}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => item.title + index.toString()}
      />
    </BackgoundContainer>
  );
};

export default Settings;
