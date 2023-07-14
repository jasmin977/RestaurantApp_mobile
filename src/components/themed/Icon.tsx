import * as React from 'react';
import { FunctionComponent, ReactNode } from 'react';

import Svg, { G, Path } from 'react-native-svg';
import { COLORS, lightPalette } from '../../themes';
import { useTheme } from '../../context';

interface SvgProps {
  as: ReactNode;
  outline?: boolean;
  color?: keyof typeof lightPalette | string;
  size?: number;
}
interface IGreyPalette {
  [key: number]: string;
}
const ICON: FunctionComponent<SvgProps> = ({
  as,
  color = 'onCard',
  size = 25,
  outline = false,
}) => {
  const { theme } = useTheme();
  let resolvedColor: string | undefined;
  let colorKey: keyof typeof lightPalette;
  let shadeKey: number | undefined;

  colorKey = color.split('.')[0] as keyof typeof lightPalette;
  shadeKey = Number(color.split('.')[1]);

  resolvedColor = shadeKey ? theme.colors[colorKey][shadeKey] : theme.colors[colorKey];

  const stroke = outline ? resolvedColor : 'none';
  const fill = outline ? 'none' : resolvedColor;

  return (
    <Svg
      fill={fill}
      strokeWidth={1.5}
      stroke={stroke}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      {as}
    </Svg>
  );
};

export default ICON;
