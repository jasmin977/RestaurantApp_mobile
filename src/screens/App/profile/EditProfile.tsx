import { FunctionComponent } from 'react';
import { Image, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { BackButton, BackgoundContainer, CenteredView } from '../../../components/common';
import { Avatar, Box, RNButton, RNIcon, RNInput, RNText } from '../../../components/themed';
import { AVATAR, BackIcon, EditIcon, EmailIcon, PhoneIcon, UserIcon } from '../../../assets';
import { RootStackParamList } from '../../../navigators/ROUTES';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '../../../context';
import { useForm, Controller } from 'react-hook-form';

import { user } from '../../../entities';
import { scale } from '../../../helpers';

interface ProfileProps {}
type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
const EditProfile = ({ navigation }: Props) => {
  const { theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<user>({
    defaultValues: {
      username: '',
      bio: '',
      password: '',
      email: '',
      gender: 0,
      phone: '',
      datOfBirth: '',
    },
  });

  const options = ['Male', 'Female'];

  return (
    <BackgoundContainer>
      <ScrollView stickyHeaderIndices={[0]}>
        <Box
          bg="background"
          direction="horizontal"
          justifyContent="space-between"
          spacing={{ px: 20, py: 10 }}
        >
          <BackButton onPress={() => navigation.goBack()} />
          <RNText variant="subtitle">My Profile</RNText>
          <RNText>{}</RNText>
        </Box>

        <Box>
          <Box w={110}>
            <Avatar size={80} />

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

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNInput label="Bio" onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="bio"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNInput label="Username" onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="username"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNInput
                label="Date of Birth"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="datOfBirth"
          />

          <Box alignItems="flex-start" gap={5} flex={1}>
            <RNText variant="subtitle" style={{ fontSize: scale(14) }}>
              Gender
            </RNText>

            <Box direction="horizontal" justifyContent="space-between" w={'100%'} gap={10}>
              <Controller
                control={control}
                name="gender"
                defaultValue={0}
                render={({ field }) => (
                  <>
                    <Box
                      flex={1}
                      bg={field.value === 0 ? 'primary' : 'card'}
                      onPress={() => field.onChange(0)}
                      spacing={{ py: 10 }}
                      rounded={10}
                    >
                      <RNText color={field.value === 0 ? 'onPrimary' : 'onCard'} variant="subtitle">
                        {options[0]}
                      </RNText>
                    </Box>

                    <Box
                      flex={1}
                      bg={field.value === 1 ? 'primary' : 'card'}
                      onPress={() => field.onChange(1)}
                      spacing={{ py: 10 }}
                      rounded={10}
                    >
                      <RNText color={field.value === 1 ? 'onPrimary' : 'onCard'} variant="subtitle">
                        {options[1]}
                      </RNText>
                    </Box>
                  </>
                )}
              />
            </Box>
          </Box>
        </Box>

        <Box gap={10} alignItems="flex-start" spacing={{ px: 20, py: 20 }}>
          <RNText variant="h5">Contact Detail</RNText>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNInput
                label="Mobile number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyBoardType="numeric"
                rightIcon={<RNIcon outline color="grey.400" as={<PhoneIcon />} />}
              />
            )}
            name="phone"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNInput
                label="Email Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyBoardType="email-address"
                rightIcon={<RNIcon outline color="grey.400" as={<EmailIcon />} />}
              />
            )}
            name="email"
          />
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
