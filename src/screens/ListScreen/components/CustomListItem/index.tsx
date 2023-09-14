import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {colors} from '../../../../constants/colors';
import {City} from '../../../../types';

type Props = {index: number; city: City; onPress?: (city: City) => void};

export const ITEM_HEIGHT = 50;

export default function CustomListItem({index, city, onPress}: Props) {
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={colors.lightGrey}
      onPress={() => onPress?.(city)}
      style={styles.customListItemWrapper}>
      <View style={styles.customListItem}>
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
  customListItemWrapper: {
    height: ITEM_HEIGHT,
    paddingHorizontal: 8,
    backgroundColor: 'white',
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
