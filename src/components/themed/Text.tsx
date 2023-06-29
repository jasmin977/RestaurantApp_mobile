import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import { COLORS, Typography } from '../../themes';

interface ITextProps {
  style?: TextStyle;
  color?: keyof typeof COLORS;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  variant?: keyof typeof Typography;
  children: React.ReactNode;
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
  color = 'onSurface',
  variant = 'body1',
  children,
  align,
  spacing,
}) => {
  const textStyles = StyleSheet.flatten([
    Typography[variant],
    { color: COLORS[color] },
    spacingStyles(spacing),
    { textAlign: align },
    style,
  ]);

  return <RNText style={textStyles}>{children}</RNText>;
};

export default Text;
