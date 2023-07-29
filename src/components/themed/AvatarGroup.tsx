import React, { FunctionComponent, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import Avatar from './Avatar';

import { scale, verticalScale } from '../../helpers';
import { useTheme } from '../../context';
import Text from './Text';

interface AvatarData {
  name: string;
  src?: string;
}

interface AvatarGroupProps {
  size?: number;
  max?: number;
  children: ReactNode;
}

const AvatarGroup: FunctionComponent<AvatarGroupProps> = ({ size = 50, max = 3, children }) => {
  const { theme } = useTheme();

  const avatars = React.Children.toArray(children) as React.ReactElement<AvatarData>[];

  return (
    <View style={styles.container}>
      {avatars.slice(0, max).map((avatar, index) => (
        <Avatar key={index} src={avatar.props.src} size={size} />
      ))}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: scale(size),
          height: scale(size),
          backgroundColor: theme.colors.background,
          borderRadius: scale(20),
        }}
      >
        <Text>+{avatars.length - max}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: -10,
  },
});

export default AvatarGroup;
