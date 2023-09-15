import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

import {colors} from '@themes/themes';
import {City} from '@src/types';
import {styles} from './styles';

type Props = {
  index: number;
  city: City;
  selected?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

export const ITEM_HEIGHT = 50;

export default function CustomListItem({
  index,
  city,
  selected = true,
  onPress,
  onLongPress,
}: Props) {
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={selected ? colors.lightGrey : colors.darkGrey}
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.customListItemWrapper,
        !selected && styles.selectedItemWrapper,
      ]}>
      <View style={[styles.customListItem, !selected && styles.selectedItem]}>
        <Text style={styles.indexText}>{`${index}.`}</Text>
        <Text style={styles.titleText}>{city.title}</Text>
      </View>
    </TouchableHighlight>
  );
}
