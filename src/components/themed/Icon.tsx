import * as React from 'react';
import { FunctionComponent, ReactNode } from 'react';

import Svg, { G, Path } from 'react-native-svg';
import { lightPalette } from '../../themes';
import { useTheme } from '../../hooks';

interface SvgProps {
  children: ReactNode;
  outline?: boolean;
  color?: keyof typeof lightPalette;
  size?: number;
}

const RNSvg: FunctionComponent<SvgProps> = ({
  children,
  color = 'white',
  size = 25,
  outline = false,
}) => {
  const { theme } = useTheme();
  const stroke = outline ? theme.colors[color] : 'none';
  const fill = outline ? 'none' : theme.colors[color];

  return (
    <Svg
      fill={fill}
      strokeWidth={1.5}
      stroke={stroke}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      {children}
    </Svg>
  );
};

export default RNSvg;
