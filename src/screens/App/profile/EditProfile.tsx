import { useRef, useState } from 'react';
import { ScrollView, Animated } from 'react-native';
import { BackButton, BackgoundContainer } from '../../../components/common';
import {
  Avatar,
  Box,
  Carousel,
  RNButton,
  RNIcon,
  RNInput,
  RNText,
} from '../../../components/themed';
import { EmailIcon, PhoneIcon } from '../../../assets';
import { RootStackParamList } from '../../../navigators/ROUTES';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth, useTheme } from '../../../context';
import { useForm, Controller } from 'react-hook-form';

import { user } from '../../../entities';
import { scale } from '../../../helpers';

import AvatarCard from './components/AvatarCard';
import { AVATARS } from '../../../CONSTANTS';
import UserService from '../../../service/Users';

const AVATAR_SIZE = 100;

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;
interface userDTO {
  bio?: string;
  name?: string;
  datOfBirth?: string | null;
  phone?: string;
  email?: string;
  gender?: number | string;
  avatar?: string;
}
const EditProfile = ({ navigation }: Props) => {
  const { mutate: updateuser, data: updateddata, isLoading, error } = UserService.updateuser();

  const { user, token } = useAuth();
  const [selectedItemIndex, setSelectedItemIndex] = useState(1);

  const scrollX = useRef(new Animated.Value(0)).current;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<user>({
    defaultValues: {
      name: user?.name,
      bio: user?.bio,

      email: user?.email,
      gender: 1,
      phone: user?.phone,
      datOfBirth: user?.datOfBirth,
    },
  });

  const options = ['Male', 'Female'];

  const handleSave = (data: userDTO) => {
    if (user) {
      data.gender = data.gender === 0 ? 'male' : 'female';
      data.avatar = `avatars/avatar_${selectedItemIndex}.jpg`;
      data.datOfBirth = null;

      updateuser({ id: user.id, token: token, data: data });

      if (!isLoading && !error) {
        navigation.goBack();
      }
    } else {
      console.error('User is null. Cannot update profile.');
    }
  };
  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <AvatarCard item={item} index={index} selectedItemIndex={selectedItemIndex} scrollX={scrollX} />
  );

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / AVATAR_SIZE);
    setSelectedItemIndex(newIndex + 1);
  };
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
          <RNText variant="subtitle">Edit Profile</RNText>
          <RNButton style={{ opacity: 0 }} />
        </Box>

        <Animated.FlatList
          data={AVATARS}
          contentContainerStyle={{ alignItems: 'center', paddingVertical: 50 }}
          horizontal
          snapToInterval={AVATAR_SIZE}
          decelerationRate={0}
          scrollEventThrottle={16}
          pagingEnabled
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: true,
            listener: handleScroll,
          })}
          keyExtractor={(item, index) => `AVATARS _${index}_${item.toString()}`}
          renderItem={renderItem}
        />

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
            name="name"
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
                defaultValue={1}
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
        <RNButton
          isLoading={isLoading}
          onPress={handleSubmit(handleSave)}
          style={{ width: '100%' }}
          title="Save"
        />
      </Box>
    </BackgoundContainer>
  );
};

export default EditProfile;
