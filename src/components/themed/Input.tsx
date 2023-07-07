import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks';
import RNSvg from './Icon';

interface RNTextInputProps {
  icon?: React.ReactNode;
  placeholder: string;
}

const RNTextInput: React.FC<RNTextInputProps> = ({ icon, placeholder }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <RNSvg color="primary" size={25} outline={true} as={icon} />
      <TextInput
        placeholder={placeholder}
        style={[styles.input, { color: theme.colors.onCard }]}
        placeholderTextColor={theme.colors.onCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flex: 1,
  },
  input: {
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default RNTextInput;
