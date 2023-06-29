import * as React from 'react';

import Svg, { Path } from 'react-native-svg';
import { FunctionComponent } from 'react';

interface IStarIconProps {
  outline?: boolean;
}

const MenuIcon: FunctionComponent<IStarIconProps> = ({ outline = true }) => {
  return (
    <>
      {outline && (
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      )}
    </>
  );
};

export default MenuIcon;
