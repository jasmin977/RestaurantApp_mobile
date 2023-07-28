import * as React from 'react';
import { FunctionComponent } from 'react';

import { Image } from 'react-native';

import { AVATAR } from '../../assets';
import { scale, verticalScale } from '../../helpers';
import { useTheme } from '../../context';

interface Props {
  src?: string;

  size?: number;
}

const Avatar: FunctionComponent<Props> = ({ src, size = 50 }) => {
  const { theme } = useTheme();
  return (
    <Image
      source={src ? { uri: src } : AVATAR}
      style={{
        width: scale(size),
        height: scale(size),
        borderRadius: scale(20),
        borderColor: theme.colors.background,
        borderWidth: 1,
      }}
    />
  );
};

export default Avatar;
