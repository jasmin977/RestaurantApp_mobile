import React, { useState } from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import { useAuth } from '../../context';
import { BackgoundContainer } from '../../components/common';
import { Box, RNButton, RNInput, RNText } from '../../components/themed';

import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../../context';
import { passwordValidator, usernameValidator } from '../../helpers/validators';
import { AuthStackProps } from '../../navigators/stacks/Auth';

const LoginScreen = ({ navigation }: AuthStackProps) => {
  const { login } = useAuth();
  const { isDarkTheme } = useTheme();
  const [username, setUsername] = useState({ value: 'yasmin', error: '' });
  const [password, setPassword] = useState({ value: '123456', error: '' });

  const [secureText, setSecureText] = useState<boolean>();
  const toggleSecureTextEntry = () => {
    setSecureText(!secureText);
  };

  const handleLogin = () => {
    const usernameError = usernameValidator(username.value);
    const passwordError = passwordValidator(password.value);
    if (usernameError || passwordError) {
      setUsername({ ...username, error: usernameError });
      setPassword({ ...password, error: passwordError });

      return;
    }

    login(username.value, password.value);
  };

  return (
    <BackgoundContainer>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <Box h={50} />
      <Box gap={20} spacing={{ px: 50 }}>
        <RNText variant="h2">Hello Again!</RNText>
        <RNText align="center" variant="subtitle">
          Welcome back you've been missed!
        </RNText>
      </Box>
      <Box h={50} />
      <Box gap={20} alignItems="flex-end" w={'100%'} spacing={{ px: 20 }}>
        <RNInput
          placeholder="Username"
          errorText={username.error}
          onChangeText={text => setUsername({ value: text, error: '' })}
        />

        <RNInput
          value={password.value}
          placeholder="Password"
          onChangeText={text => setPassword({ value: text, error: '' })}
          errorText={password.error}
          type="password"
        />
        <TouchableOpacity>
          <RNText variant="caption">Recovery password</RNText>
        </TouchableOpacity>
      </Box>
      <Box spacing={{ px: 20 }} w={'100%'} gap={10} style={{ position: 'absolute', bottom: 50 }}>
        <RNButton style={{ width: '100%' }} title="Sign in" onPress={handleLogin} />

        <Box direction="horizontal" gap={5}>
          <RNText variant="caption">Not a member?</RNText>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <RNText color="primary" style={{ fontWeight: 'bold' }} variant="caption">
              Register Now
            </RNText>
          </TouchableOpacity>
        </Box>
      </Box>
    </BackgoundContainer>
  );
};

export default LoginScreen;
