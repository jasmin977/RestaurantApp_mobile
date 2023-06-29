import * as React from 'react';
import { FunctionComponent } from 'react';

import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';

const LocationIcon: FunctionComponent<IconProps> = ({ color = 'red', size = 30, outline }) => {
  const stroke = outline ? color : 'none';
  const fill = outline ? 'none' : color;

  return (
    <Svg fill={fill} strokeWidth={1.5} stroke={stroke} width={size} height={size}>
      {outline ? (
        <>
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </>
      ) : (
        <Path
          fillRule="evenodd"
          d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
          clipRule="evenodd"
        />
      )}
    </Svg>
  );
};

export default LocationIcon;