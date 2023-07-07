import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../hooks';
import Text from './Text';
import { SIZES } from '../../themes';

interface ThemedButtonProps {
  title?: string;
  centerIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  color?: 'primary' | 'secondary';
  variant?: 'solid' | 'outline';
  isLoading?: boolean;
  disabled?: boolean;
  size?: keyof typeof SIZES;
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
  ...restProps
}) => {
  const { theme } = useTheme();

  const renderIcon = (icon: React.ReactNode) => <View style={styles.spinner}>{icon}</View>;

  // Merge the provided `style` prop with the existing styles
  const containerStyle = [
    styles.container,
    {
      paddingVertical: SIZES[size],
      paddingHorizontal: SIZES[size],
      backgroundColor: variant === 'solid' ? theme.colors[color] : theme.colors.background,
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: theme.colors[color],
      opacity: disabled ? 0.6 : 1,
    },
    style,
  ];

  const textStyle: TextStyle = {
    fontWeight: 'bold',
    marginLeft: leftIcon ? 8 : 0,
    marginRight: rightIcon ? 8 : 0,
    color: variant === 'solid' ? theme.colors.onPrimary : theme.colors[color],
    fontSize: SIZES[size],
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={containerStyle}
      onPress={onPress}
      disabled={isLoading || !onPress || disabled}
      {...restProps}
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
          {title && <Text style={textStyle}>{title}</Text>}
        </>
      )}
      {rightIcon && renderIcon(rightIcon)}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  spinner: {
    marginHorizontal: 6,
  },
  centerIconContainer: {},
});

export default ThemedButton;
