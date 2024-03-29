import React from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../context';
import { BackgoundContainer } from '../../components/common';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../../components/themed';

import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../context';
import { AuthStackProps } from '../../navigators/stacks';
import { UserIcon } from '../../assets';
import { user } from '../../entities';
import AuthenticationService from '../../service/Authentication';
import { scale, verticalScale } from '../../helpers';

interface authDTO {
  name: string;
  password: string;
}
const LoginScreen = ({ navigation }: AuthStackProps) => {
  const { isDarkTheme, theme } = useTheme();
  const { onLogin, isLoading, error } = AuthenticationService.useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<authDTO>({
    defaultValues: {
      name: 'yasmine2',
      password: '123456',
    },
  });

  const handleLogin = (data: authDTO) => {
    const loginData = {
      name: data.name,
      password: data.password,
    };
    onLogin(loginData);
  };

  return (
    <BackgoundContainer>
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
        <Box gap={5} spacing={{ px: 50, py: 30 }}>
          <Image
            source={require('../../assets/LOGO.png')}
            style={{
              width: scale(100),
              height: verticalScale(100),
            }}
            resizeMode="contain"
          />

          <RNText variant="h5">Hello Again!</RNText>
          <RNText align="center" variant="caption">
            Welcome back you've been missed!
          </RNText>
        </Box>
        <Box gap={20} alignItems="flex-end" w={'100%'} spacing={{ px: 20 }}>
          <Controller
            control={control}
            rules={{
              required: "Username can't be empty.",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNInput
                label="Username"
                placeholder="flen"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorText={errors.name?.message || (error && 'wrong username')}
                rightIcon={<RNIcon color="grey.400" as={<UserIcon />} />}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            rules={{
              required: "Password can't be empty.",
              maxLength: {
                value: 10,
                message: 'Password should not exceed 10 characters.',
              },
              minLength: {
                value: 5,
                message: 'Password must be at least 5 characters long.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNInput
                label="Password"
                value={value}
                placeholder="********"
                onBlur={onBlur}
                onChangeText={onChange}
                errorText={errors.password?.message || (error && 'wrong password')}
                type="password"
              />
            )}
            name="password"
          />

          <TouchableOpacity>
            <RNText variant="caption" color="primary">
              Forget Password?
            </RNText>
          </TouchableOpacity>
        </Box>
      </ScrollView>
      <Box
        spacing={{ px: 20 }}
        w={'100%'}
        gap={20}
        style={{ position: 'absolute', bottom: verticalScale(20) }}
      >
        <RNButton
          style={{ width: '100%', shadowColor: theme.colors.primary, elevation: 20 }}
          title="Sign in"
          isLoading={isLoading}
          onPress={handleSubmit(handleLogin)}
        />

        <Box direction="horizontal" alignItems="baseline" gap={10}>
          <RNText variant="caption">Not a member?</RNText>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <RNText color="primary" style={{ fontWeight: 'bold' }} variant="caption">
              Register Now
            </RNText>
          </TouchableOpacity>
        </Box>
      </Box>
      <Box h={50} />
    </BackgoundContainer>
  );
};

export default LoginScreen;
