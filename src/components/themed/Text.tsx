import React, { ReactNode } from 'react';

import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, lightPalette } from '../../themes';
import { useTheme } from '../../context';
import { moderateScale, moderateVerticalScale } from '../../helpers';

interface ITextProps {
  style?: TextStyle;
  color?: keyof typeof lightPalette | keyof typeof COLORS;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  variant?: keyof typeof TYPOGRAPHY;
  children: ReactNode;
  spacing?: {
    p?: number;
    m?: number;
    pt?: number;
    pb?: number;
    pl?: number;
    pr?: number;
    mt?: number;
    mb?: number;
    ml?: number;
    mr?: number;
    mx?: number;
    my?: number;
    py?: number;
    px?: number;
  };
  [key: string]: any; // Allow any additional props
}

const spacingStyles = (spacing?: ITextProps['spacing']): TextStyle | undefined => {
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
      mx = 0,
      my = 0,
      px = 0,
      py = 0,
    } = spacing;
    return {
      // Provide specific top padding (pt) or fallback to a general padding value (p) if pt is not provided
      paddingTop: moderateVerticalScale(pt) || moderateVerticalScale(py) || moderateScale(p),
      paddingBottom: moderateVerticalScale(pb) || moderateVerticalScale(py) || moderateScale(p),
      paddingLeft: moderateScale(pl) || moderateScale(px) || moderateScale(p),
      paddingRight: moderateScale(pr) || moderateScale(px) || moderateScale(p),
      marginTop: moderateVerticalScale(mt) || moderateVerticalScale(my) || moderateScale(m),
      marginBottom: moderateVerticalScale(mb) || moderateVerticalScale(my) || moderateScale(m),
      marginLeft: moderateScale(ml) || moderateScale(mx) || moderateScale(m),
      marginRight: moderateScale(mr) || moderateScale(mx) || moderateScale(m),
    };
  }
  return undefined;
};

const Text: React.FC<ITextProps> = ({
  style,
  color = 'onBackground',
  variant = 'body',
  children,
  align,
  spacing,
  ...restProps
}) => {
  const { theme } = useTheme();
  const textStyles = StyleSheet.flatten([
    TYPOGRAPHY[variant],
    { color: theme.colors[color] },
    spacingStyles(spacing),
    { textAlign: align },
    style,
  ]);

  return (
    <RNText style={textStyles} {...restProps}>
      {children}
    </RNText>
  );
};

export default Text;
