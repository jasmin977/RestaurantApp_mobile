import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { BackButton, BackgoundContainer } from '../../components/common';
import { useAuth, useTheme } from '../../context';
import { useRef, useState } from 'react';
import { Box, RNButton, RNText } from '../../components/themed';
import AuthenticationService from '../../service/Authentication';
import { verticalScale } from '../../helpers';

const CodeInput = ({
  code,
  setCode,
  errorText,
  seterrorText,
}: {
  code: string[];
  setCode: (code: string[]) => void;
  errorText: string;
  seterrorText: (error: string) => void;
}) => {
  const inputRefs = useRef([]);
  const { isDarkTheme, theme } = useTheme();

  const handleCodeChange = (text: string, index: number) => {
    if (/^\d{0,1}$/.test(text)) {
      // Update the corresponding code value in state
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      seterrorText('');

      // Move focus to the next input field
      if (text.length === 1 && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <View
      style={{
        alignItems: 'center',
        paddingHorizontal: 20,
      }}
    >
      <Box gap={5} spacing={{ px: 20, py: 30 }}>
        <RNText variant="h5">Verify your account!</RNText>
        <RNText align="center" variant="caption">
          Use this PIN code we sent you to complete your registration.
        </RNText>
      </Box>
      <View style={styles.inputContainer}>
        {[0, 1, 2, 3].map(index => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={[styles.input, { backgroundColor: theme.colors.card }]}
            maxLength={1}
            keyboardType="number-pad"
            value={code[index]}
            onChangeText={text => handleCodeChange(text, index)}
            onKeyPress={event => handleKeyPress(event, index)}
          />
        ))}
      </View>
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};
const VerifEmailScreen = () => {
  const { isDarkTheme, theme } = useTheme();
  const { token } = useAuth();
  const { mutate: verify, data, isLoading, error } = AuthenticationService.useVerifyAccount();
  const { mutate: resend } = AuthenticationService.useReSendPin();
  const [code, setCode] = useState(['', '', '', '']);
  const [errorText, seterrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResendCode = async () => {
    resend(token);
    setCode(['', '', '', '']);
  };

  const hanldeVerifyEmail = async () => {
    verify({ pin: parseInt(code.join('')), token: token });

    if (error) return console.log(error);
    if (data && !error && !isLoading) {
      // navigation.replace( );
    }
  };

  return (
    <BackgoundContainer>
      <View style={{ alignSelf: 'flex-start', paddingHorizontal: 20 }}></View>

      {/** code inputs */}
      <View>
        <CodeInput
          code={code}
          setCode={setCode}
          errorText={errorText}
          seterrorText={seterrorText}
        />
      </View>

      <Box spacing={{ px: 20 }} w={'100%'} gap={20}>
        <View style={styles.row}>
          <Text>Didn’t get the codet? </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.link}>Resend</Text>
          </TouchableOpacity>
        </View>

        <RNButton isLoading={loading} title="Verify" onPress={hanldeVerifyEmail} />
      </Box>
    </BackgoundContainer>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350,
    marginBottom: 4,
  },

  subtitle: {
    fontWeight: '300',
    fontSize: 17,
    lineHeight: 20,
    display: 'flex',
    color: 'black',

    textAlign: 'center',
    width: 300,
  },

  row: {
    flexDirection: 'row',
    marginTop: 10,
  },

  link: {
    fontWeight: 'bold',
  },
  container: {
    marginVertical: 20,
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    padding: 10,
  },
  input: {
    width: 60,
    height: 60,
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',

    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
export default VerifEmailScreen;
