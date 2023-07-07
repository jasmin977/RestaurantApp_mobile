import React, { ReactNode } from 'react';

import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { COLORS, TYPOGRAPHY, lightPalette } from '../../themes';
import { useTheme } from '../../hooks';

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
  };
}
const spacingStyles = (spacing?: ITextProps['spacing']): TextStyle | undefined => {
  if (spacing) {
    const { p, m, pt, pb, pl, pr, mt, mb, ml, mr } = spacing;
    return {
      //provide specific top padding (pt) or fallback to a general padding value (p) if pt is not provided
      paddingTop: pt || p,
      paddingBottom: pb || p,
      paddingLeft: pl || p,
      paddingRight: pr || p,
      marginTop: mt || m,
      marginBottom: mb || m,
      marginLeft: ml || m,
      marginRight: mr || m,
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
}) => {
  const { theme } = useTheme();
  const textStyles = StyleSheet.flatten([
    TYPOGRAPHY[variant],
    { color: theme.colors[color] },
    spacingStyles(spacing),
    { textAlign: align },
    style,
  ]);

  return <RNText style={textStyles}>{children}</RNText>;
};

export default Text;
