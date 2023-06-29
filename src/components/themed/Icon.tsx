import * as React from 'react';
import { FunctionComponent, ReactNode } from 'react';

import Svg, { G, Path } from 'react-native-svg';

interface SvgProps {
  children: ReactNode;
  outline?: boolean;
  color?: string;
  size?: number;
}

const RNSvg: FunctionComponent<SvgProps> = ({
  children,
  color = 'white',
  size = 25,
  outline = false,
}) => {
  const stroke = outline ? color : 'none';
  const fill = outline ? 'none' : color;

  return (
    <Svg
      fill={fill}
      strokeWidth={1.5}
      stroke={stroke}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      {outline ? (
        <G strokeLinecap="round" strokeLinejoin="round">
          {children}
        </G>
      ) : (
        <G fillRule="evenodd">{children}</G>
      )}
    </Svg>
  );
};

export default RNSvg;
