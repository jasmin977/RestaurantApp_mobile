import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { RNIcon } from '.';
import { NextIcon } from '../../assets';

interface Item {
  key: string;
  value: boolean;
}

interface AccordianProps {
  title: string;
  data: Item[];
}

const Accordian: React.FC<AccordianProps> = ({ title, data }) => {
  const [expanded, setExpanded] = useState(false);
  const [itemsData, setItemsData] = useState(data);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const onClick = (index: number) => {
    const temp = [...data];
    temp[index].value = !temp[index].value;
    setItemsData(temp);
  };

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const renderChildItem = ({ item, index }: { item: Item; index: number }) => (
    <View>
      <TouchableOpacity
        style={[styles.childRow, styles.button, item.value ? styles.btnActive : styles.btnInActive]}
        onPress={() => onClick(index)}
      >
        <Text style={[styles.itemInActive]}>{item.key}</Text>
        <RNIcon as={<NextIcon />} />
      </TouchableOpacity>
      <View style={styles.childHr} />
    </View>
  );

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={toggleExpand}>
        <Text style={[styles.title]}>{title}</Text>
        <RNIcon as={<NextIcon />} />
      </TouchableOpacity>
      <View style={styles.parentHr} />
      {expanded && (
        <View>
          <FlatList data={data} numColumns={1} scrollEnabled={false} renderItem={renderChildItem} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
  },
  itemActive: {
    fontSize: 12,
    color: 'red',
  },
  itemInActive: {
    fontSize: 12,
    color: 'red',
  },
  btnActive: {
    borderColor: 'red',
  },
  btnInActive: {
    borderColor: 'red',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    color: 'red',
  },
  childRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: 'red',
  },
  parentHr: {
    height: 1,
    color: 'red',
    width: '100%',
  },
  childHr: {
    height: 1,
    backgroundColor: 'red',
    width: '100%',
  },
  colorActive: {
    borderColor: 'red',
  },
  colorInActive: {
    borderColor: 'red',
  },
});

export default Accordian;
