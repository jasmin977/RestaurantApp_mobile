/*  
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface RNTextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder: string;
  type?: string;
  size?: string;
  color?: string;
  textColor?: string;
}

const CustomizableInput:React.FC<RNTextInputProps> = ({
  leftIcon,
  rightIcon,
  placeholder,
  type,
  size,
  color,
  textColor,
  ...restProps
}) => {
  const inputStyle = {
    fontSize: size,
    color: textColor,
    borderColor: color,
   
  };

  return (
    <View style={styles.container} {...restProps}>
      {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        secureTextEntry={type === 'password'}
      />
      {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  iconContainer: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
});
export default CustomizableInput;
 */
