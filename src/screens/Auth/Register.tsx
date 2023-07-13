import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '../../context';
import { BackgoundContainer } from '../../components/common';
import { Box, RNButton, RNIcon, RNInput, RNText } from '../../components/themed';

import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../context';
import { emailValidator, passwordValidator, usernameValidator } from '../../helpers/validators';
import { AuthStackProps } from '../../navigators/stacks/Auth';

const RegisterScreen = ({ navigation }: AuthStackProps) => {
  const { login } = useAuth();
  const { isDarkTheme } = useTheme();
  const [username, setUsername] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [isLoading, setisloading] = useState(false);
  const handleLogin = () => {
    const usernameError = usernameValidator(username.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (usernameError || passwordError || emailError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });
      setEmail({ ...email, error: emailError });

      return;
    }

    login(username.value, password.value);
  };

  return (
    <BackgoundContainer>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <Box h={50} />
      <Box gap={20} spacing={{ px: 50 }}>
        <RNText variant="h2">Create an account!</RNText>
        <RNText align="center" variant="subtitle">
          Sign up now and unlock exclusive access!
        </RNText>
      </Box>
      <Box h={50} />
      <Box gap={20} w={'100%'} spacing={{ px: 20 }}>
        <RNInput
          placeholder="Email"
          value={email.value}
          errorText={email.error}
          onChangeText={text => setEmail({ value: text, error: '' })}
          keyBoardType="email-address"
        />
        <RNInput
          placeholder="Username"
          value={username.value}
          errorText={username.error}
          onChangeText={text => setUsername({ value: text, error: '' })}
        />

        <RNInput
          placeholder="Password"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          errorText={password.error}
          type="password"
        />
      </Box>
      <Box spacing={{ px: 20 }} w={'100%'} gap={10} style={{ position: 'absolute', bottom: 50 }}>
        <RNButton style={{ width: '100%' }} title="Sign in" onPress={handleLogin} />

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
