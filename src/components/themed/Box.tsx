import React, { ReactNode } from 'react';
import { View, ViewProps, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { lightPalette } from '../../themes';
import { useTheme } from '../../hooks';
import { TouchableOpacity } from 'react-native';

interface BoxProps {
  children?: ReactNode;
  bg?: keyof typeof lightPalette;
  rounded?: number | string;
  gap?: number;
  h?: number | string;
  w?: number | string;
  flex?: number;
  onPress?: () => void;
  alignItems?: StyleProp<ViewStyle['alignItems']>;
  justifyContent?: StyleProp<ViewStyle['justifyContent']>;
  direction?: 'horizontal' | 'vertical';
  spacing?: {
    p?: number | string;
    m?: number | string;
    px?: number | string;
    py?: number | string;
    mx?: number | string;
    my?: number | string;
    pt?: number | string;
    pb?: number | string;
    pl?: number | string;
    pr?: number | string;
    mt?: number | string;
    mb?: number | string;
    ml?: number | string;
    mr?: number | string;
  };
  style?: ViewStyle;
}

const spacingStyles = (spacing?: BoxProps['spacing']): ViewStyle | undefined => {
  if (spacing) {
    const { p, m, pt, pb, pl, pr, mt, mb, ml, mr, px, py, mx, my } = spacing;
    return {
      paddingTop: pt || py || p,
      paddingBottom: pb || py || p,
      paddingLeft: pl || px || p,
      paddingRight: pr || px || p,
      marginTop: mt || my || m,
      marginBottom: mb || my || m,
      marginLeft: ml || mx || m,
      marginRight: mr || mx || m,
    };
  }
  return undefined;
};

const Box = ({
  children,
  flex,
  bg,
  rounded,
  spacing,
  gap,
  h,
  w,
  alignItems = 'center',
  justifyContent = 'center',
  direction = 'vertical',
  style,
  onPress,
  ...restProps
}: BoxProps) => {
  const { theme } = useTheme();
  const boxStyle = StyleSheet.flatten([
    { backgroundColor: theme.colors[bg] },
    { gap: gap },
    { flex: flex },
    { borderRadius: rounded },
    spacingStyles(spacing),
    { height: h },
    { width: w },
    { flexDirection: direction === 'horizontal' ? 'row' : 'column' },
    { alignItems },
    { justifyContent },
    style,
  ]);

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={0.5}
      style={boxStyle}
      {...restProps}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Box;
