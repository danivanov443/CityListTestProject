import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors} from '../../../../constants/colors';
import {City} from '../../../../types';

type Props = {
  index: number;
  city: City;
  selected?: boolean;
  onPress?: (city: City) => void;
  onLongPress?: (city: City) => void;
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
      underlayColor={selected ? colors.lightGrey : colors.mediumGrey}
      onPress={() => onPress?.(city)}
      onLongPress={() => onLongPress?.(city)}
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

export const styles = StyleSheet.create({
  customListItem: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    flexDirection: 'row',
  },
  selectedItem: {
    borderColor: colors.darkGrey,
  },
  customListItemWrapper: {
    height: ITEM_HEIGHT,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  selectedItemWrapper: {
    backgroundColor: colors.selectedBg,
  },
  indexText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textColor,
    marginEnd: 8,
  },
  titleText: {
    fontSize: 14,
    color: colors.textColor,
  },
});
