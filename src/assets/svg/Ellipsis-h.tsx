import * as React from 'react';

import Svg, { Path } from 'react-native-svg';
import { FunctionComponent } from 'react';
import { IconProps } from './types';

const EllipsisIcon: FunctionComponent<IconProps> = ({ outline = true }) => {
  return (
    <>
      {outline && (
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      )}
    </>
  );
};

export default EllipsisIcon;
