import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle, Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import RNSvg from './Icon';

interface IButtonProps {
  children: string | ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<IButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary,
      padding: 5,

      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    secondaryButton: {
      backgroundColor: theme.colors.notification,
    },
    disabledButton: {
      backgroundColor: theme.colors.border,
    },
    buttonText: {
      fontWeight: 'bold',
    },
    secondaryButtonText: {
      color: theme.colors.primary,
    },
    disabledButtonText: {
      color: theme.colors.text,
    },
    iconContainer: {
      padding: 4,
    },
  });

  const buttonStyles: ViewStyle = {
    ...styles.button,
    ...(variant === 'secondary' && styles.secondaryButton),
    ...(disabled && styles.disabledButton),
    ...style,
  };

  const textStyles: TextStyle = {
    ...styles.buttonText,
    ...(variant === 'secondary' && styles.secondaryButtonText),
    ...(disabled && styles.disabledButtonText),
  };

  const renderContent = () => {
    if (typeof children === 'string') {
      return <Text style={textStyles}>{children}</Text>;
    }
    return <View style={styles.iconContainer}>{children}</View>;
  };

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled}>
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
