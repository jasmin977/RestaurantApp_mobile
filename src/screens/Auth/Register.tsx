import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context';
import { BackgoundContainer } from '../../components/common';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../../components/themed';
import { useForm, Controller } from 'react-hook-form';

import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../context';
import { emailValidator, passwordValidator, usernameValidator } from '../../helpers/validators';
import { AuthStackProps } from '../../navigators/stacks';
import { EmailIcon, UserIcon } from '../../assets';

type RegisterFormData = {
  username: string;
  password: string;
  email: string;
};

const RegisterScreen = ({ navigation }: AuthStackProps) => {
  const { login } = useAuth();
  const { isDarkTheme, theme } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
  });

  const handleRegister = (data: RegisterFormData) => {
    console.log(data.username, data.password);
  };

  return (
    <BackgoundContainer>
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <StatusBar style={isDarkTheme ? 'light' : 'dark'} />

        <Box gap={20} spacing={{ px: 20, py: 30 }}>
          <RNText variant="h2">Create an account!</RNText>
          <RNText align="center" variant="subtitle">
            Sign up now and unlock exclusive access!
          </RNText>
        </Box>

        <Box gap={20} w={'100%'} spacing={{ px: 20 }}>
          <Controller
            control={control}
            rules={{
              required: "Email can't be empty.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <RNInput
                label="Email"
                placeholder="email@test.com"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorText={errors.email?.message}
                keyBoardType="email-address"
                rightIcon={<RNIcon outline color="grey.400" as={<EmailIcon />} />}
              />
            )}
            name="email"
          />

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
                errorText={errors.username?.message}
                rightIcon={<RNIcon color="grey.400" as={<UserIcon />} />}
              />
            )}
            name="username"
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
                placeholder="*******"
                onBlur={onBlur}
                onChangeText={onChange}
                errorText={errors.password?.message}
                type="password"
              />
            )}
            name="password"
          />
        </Box>
      </ScrollView>
      <Box spacing={{ px: 20 }} w={'100%'} gap={30} style={{ position: 'absolute', bottom: 50 }}>
        <RNButton
          style={{ width: '100%', shadowColor: theme.colors.primary, elevation: 20 }}
          title="Sign in"
          onPress={handleSubmit(handleRegister)}
        />

        <Box direction="horizontal" gap={5}>
          <RNText variant="caption">Already have an account?</RNText>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <RNText color="primary" style={{ fontWeight: 'bold' }} variant="caption">
              Sign in
            </RNText>
          </TouchableOpacity>
        </Box>
      </Box>
    </BackgoundContainer>
  );
};

export default RegisterScreen;
