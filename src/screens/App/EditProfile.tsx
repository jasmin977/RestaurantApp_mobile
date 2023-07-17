import { FunctionComponent } from 'react';
import { Image, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { BackgoundContainer, CenteredView } from '../../components/common';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../../components/themed';
import { AVATAR, BackIcon, EditIcon } from '../../assets';
import { RootStackParamList } from '../../navigators/ROUTES';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../context';

import { useRadioGroup } from '../../hooks';

interface ProfileProps {}
type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
const EditProfile = ({ navigation }: Props) => {
  const { theme } = useTheme();
  const options = ['Male', 'Female'];
  const { getRadioProps } = useRadioGroup<string>({
    name: 'gender',
    defaultValue: 'Male',
    onChange: console.log,
  });
  return (
    <BackgoundContainer>
      <ScrollView stickyHeaderIndices={[0]}>
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
          <RNText variant="subtitle">My Profile</RNText>
          <RNText>{}</RNText>
        </Box>

        <Box>
          <Box w={110}>
            <Image source={AVATAR} style={{ width: 100, height: 100, borderRadius: 100 }} />
            <Box
              bg="background"
              spacing={{ p: 8 }}
              rounded={50}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                shadowColor: 'grey',
                elevation: 10,
              }}
            >
              <RNIcon size={20} as={<EditIcon />} />
            </Box>
          </Box>
        </Box>

        <Box gap={10} alignItems="flex-start" spacing={{ px: 20, py: 20 }}>
          <RNText variant="h5">Basic Detail</RNText>

          <RNInput label="Bio" />
          <RNInput label="Username" />
          <RNInput label="Date of birth" />
          <Box alignItems="flex-start" gap={5}>
            <RNText variant="subtitle" style={{ fontSize: 14 }}>
              Gender
            </RNText>

            <Box direction="horizontal" justifyContent="space-between" w={'100%'} gap={10}>
              {options.map(value => {
                const radio = getRadioProps({ value });

                return (
                  <Box
                    flex={1}
                    bg={radio.checked ? 'primary' : 'card'}
                    key={value}
                    onPress={radio.onChange}
                    spacing={{ py: 10 }}
                    rounded={10}
                  >
                    <RNText color={radio.checked ? 'onPrimary' : 'onCard'} variant="subtitle">
                      {value}
                    </RNText>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        <Box gap={10} alignItems="flex-start" spacing={{ px: 20, py: 20 }}>
          <RNText variant="h5">Contact Detail</RNText>

          <RNInput label="Mobile number" />
          <RNInput label="Email Address" />
        </Box>
        <Box h={100} />
      </ScrollView>
      <Box
        spacing={{ p: 20 }}
        bg="background"
        style={{
          position: 'absolute',
          bottom: 0,
          zIndex: 1,
          left: 0,
          right: 0,
        }}
      >
        <RNButton style={{ width: '100%' }} title="Save" />
      </Box>
    </BackgoundContainer>
  );
};

export default EditProfile;
