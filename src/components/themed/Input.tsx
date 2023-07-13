import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context';

import { EyeIcon, LikeIcon } from '../../assets';
import Box from './Box';

import ICON from './Icon';
import Text from './Text';
import { lightPalette } from '../../themes';

interface RNTextInputProps {
  value?: string;
  onChangeText: (text: string) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder: string;
  variant?: 'outline' | 'filled';
  type?: string;
  size?: string;
  color?: keyof typeof lightPalette;
  textColor?: string;
  errorText?: string;
  keyBoardType?: 'default' | 'numeric' | 'email-address';
}

const RNTextInput: React.FC<RNTextInputProps> = ({
  value,
  onChangeText,
  leftIcon,
  rightIcon,
  placeholder,
  variant = 'filled',
  type = 'text',
  size,
  color = 'onCard',
  textColor = 'white',
  keyBoardType = 'default',
  errorText,
  ...restProps
}) => {
  const { theme } = useTheme();

  const inputContainerStyle =
    variant === 'outline' ? styles.outlineContainer : styles.filledContainer;
  const inputBorderStyle = variant === 'outline' ? styles.outlineInput : styles.filledInput;
  const inputStyle = [styles.input, { fontSize: size, color: theme.colors.onCard }];
  return (
    <Box gap={5} alignItems="flex-start">
      <View style={[inputContainerStyle, { backgroundColor: theme.colors.card }]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[inputBorderStyle, inputStyle]}
          placeholder={placeholder}
          //   secureTextEntry={secureText}
          placeholderTextColor={theme.colors.onCard}
          keyboardType={keyBoardType}
          {...restProps}
        />
        {/*  {type === 'password' && (
          <TouchableOpacity style={styles.iconContainer} onPress={toggleSecureTextEntry}>
            <ICON color="onCard" as={<EyeIcon outline={!secureText} />} />
          </TouchableOpacity>
        )} */}
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
      {errorText && (
        <Text variant="caption" color="primary">
          {errorText}
        </Text>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  outlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,

    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: 'black',
  },
  filledContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'black',
  },
  outlineInput: {
    marginLeft: 10,
    flex: 1,
    color: 'black',
  },
  filledInput: {
    marginLeft: 10,
    flex: 1,
    color: 'white',
  },
  iconContainer: {
    marginHorizontal: 8,
  },
  input: {
    marginLeft: 10,
    flex: 1,
    height: 30,
  },
});

export default RNTextInput;
