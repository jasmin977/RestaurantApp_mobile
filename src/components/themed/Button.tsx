import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks';
import Text from './Text';
import { sizes } from '../../themes';

interface ThemedButtonProps {
  title?: string;
  centerIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  color?: 'primary' | 'secondary';
  variant?: 'solid' | 'outline';
  isLoading?: boolean;
  disabled?: boolean;
  size?: keyof typeof sizes;
  onPress?: () => void;
  style?: ViewStyle;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  centerIcon,
  leftIcon,
  rightIcon,
  color = 'primary',
  variant = 'solid',
  isLoading = false,
  disabled = false,
  size = 'md',
  style,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: sizes[size],
      paddingHorizontal: sizes[size],
      borderRadius: 15,
      backgroundColor: variant === 'solid' ? theme.colors[color] : theme.colors.background,
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: theme.colors[color],
      opacity: disabled ? 0.6 : 1,
      ...style,
    },
    buttonText: {
      marginLeft: leftIcon ? 8 : 0,
      marginRight: rightIcon ? 8 : 0,
      color: variant === 'solid' ? theme.colors.onPrimary : theme.colors[color],
      fontWeight: 'bold',

      fontSize: sizes[size],
    },
    spinner: {
      marginHorizontal: 6,
    },
    centerIconContainer: {},
  });

  const renderIcon = (icon: React.ReactNode) => <View style={styles.spinner}>{icon}</View>;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={isLoading || !onPress || disabled}
    >
      {leftIcon && renderIcon(leftIcon)}
      {isLoading ? (
        <ActivityIndicator
          size={size === 'lg' ? 'large' : 'small'}
          color={variant === 'solid' ? theme.colors.onPrimary : theme.colors.primary}
        />
      ) : (
        <>
          {centerIcon && <View style={styles.centerIconContainer}>{centerIcon}</View>}
          {title && <Text style={styles.buttonText}>{title}</Text>}
        </>
      )}
      {rightIcon && renderIcon(rightIcon)}
    </TouchableOpacity>
  );
};

export default ThemedButton;
