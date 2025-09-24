import React, { ReactNode } from 'react';
import { View, ViewProps, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { lightPalette } from '../../themes';

import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../context';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from '../../helpers';

interface BoxProps {
  children?: ReactNode;
  bg?: keyof typeof lightPalette;
  rounded?: number;
  gap?: number;
  h?: number | string;
  w?: number | string;
  flex?: number;
  onPress?: () => void;
  alignItems?: StyleProp<ViewStyle['alignItems']>;
  justifyContent?: StyleProp<ViewStyle['justifyContent']>;
  direction?: 'horizontal' | 'vertical';
  spacing?: {
    p?: number;
    m?: number;
    px?: number;
    py?: number;
    mx?: number;
    my?: number;
    pt?: number;
    pb?: number;
    pl?: number;
    pr?: number;
    mt?: number;
    mb?: number;
    ml?: number;
    mr?: number;
  };
  style?: ViewStyle;
  [key: string]: any; // Allow any additional props
}

const spacingStyles = (spacing?: BoxProps['spacing']): ViewStyle | undefined => {
  if (spacing) {
    const {
      p = 0,
      m = 0,
      pt = 0,
      pb = 0,
      pl = 0,
      pr = 0,
      mt = 0,
      mb = 0,
      ml = 0,
      mr = 0,
      px = 0,
      py = 0,
      mx = 0,
      my = 0,
    } = spacing;
    return {
      paddingTop:
        moderateVerticalScale(pt) || moderateVerticalScale(py) || moderateVerticalScale(p),
      paddingBottom:
        moderateVerticalScale(pb) || moderateVerticalScale(py) || moderateVerticalScale(p),
      paddingLeft: moderateScale(pl) || moderateScale(px) || moderateScale(p),
      paddingRight: moderateScale(pr) || moderateScale(px) || moderateScale(p),
      marginTop: moderateVerticalScale(mt) || moderateVerticalScale(my) || moderateVerticalScale(m),
      marginBottom:
        moderateVerticalScale(mb) || moderateVerticalScale(my) || moderateVerticalScale(m),
      marginLeft: moderateScale(ml) || moderateScale(mx) || moderateScale(m),
      marginRight: moderateScale(mr) || moderateScale(mx) || moderateScale(m),
    };
  }
  return undefined;
};

const Box = ({
  children,
  flex,
  bg,
  rounded = 0,
  spacing,
  gap = 0,
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
    { gap: scale(gap) },
    { flex: flex },
    { borderRadius: scale(rounded) },
    spacingStyles(spacing),
    { height: typeof h === 'number' ? verticalScale(h) : h },
    { width: typeof w === 'number' ? scale(w) : w },
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
