import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks';
import RNSvg from './Icon';

interface ThemedInputWithLeftIconProps {
  icon?: React.ReactNode;
  placeholder: string;
}

const ThemedInputWithLeftIcon: React.FC<ThemedInputWithLeftIconProps> = ({ icon, placeholder }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <RNSvg color="primary" size={25} outline={true}>
        {icon}
      </RNSvg>
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

export default ThemedInputWithLeftIcon;
