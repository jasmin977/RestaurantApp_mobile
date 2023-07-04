import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface StackProps extends ViewProps {
  children: React.ReactNode;
  spacing?: number;
  divider?: boolean;
  direction?: 'horizontal' | 'vertical';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly';
  gap?: number;
}

const Stack: React.FC<StackProps> = ({
  children,
  spacing = 0,
  divider = false,
  align = 'center',
  justify = 'center',
  direction = 'vertical',
  gap = spacing,
  style,
  ...rest
}) => {
  const dir = direction === 'horizontal' ? 'row' : 'column';
  const containerStyle = [
    styles.stack,
    { alignItems: align, justifyContent: justify },
    { marginHorizontal: -gap / 2 },

    { flexDirection: dir },

    divider && styles.divider,
  ];
  const itemStyle =
    direction === 'horizontal' ? { marginHorizontal: gap / 2 } : { marginVertical: gap / 2 };

  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!divider || index === 0) {
      return child;
    }

    return (
      <>
        <View style={itemStyle} />
        {child}
      </>
    );
  });

  return (
    <View style={containerStyle} {...rest}>
      {modifiedChildren}
    </View>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
});

export default Stack;
