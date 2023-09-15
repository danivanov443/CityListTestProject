import React, {useCallback, useEffect, useState} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

import {colors} from '@themes/themes';
import {City} from '@src/types';
import {styles} from './styles';

type Props = {
  index: number;
  city: City;
  isMultiselect?: boolean;
  onSelect?: () => void;
  onToggleMultiselect?: () => void;
};

export default function CustomListItem({
  index,
  city,
  isMultiselect = false,
  onSelect,
  onToggleMultiselect,
}: Props) {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = useCallback(() => {
    if (isMultiselect) {
      setIsSelected(prev => !prev);
    }
    onSelect?.();
  }, [isMultiselect, onSelect]);

  const handleLongPress = useCallback(() => {
    if (!isMultiselect) {
      setIsSelected(prev => !prev);
    }
    onToggleMultiselect?.();
  }, [isMultiselect, onToggleMultiselect]);

  useEffect(() => {
    if (!isMultiselect) {
      setIsSelected(false);
    }
  }, [isMultiselect]);

  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={
        isMultiselect
          ? isSelected
            ? colors.lightGrey
            : colors.darkGrey
          : colors.lightGrey
      }
      onPress={handlePress}
      onLongPress={handleLongPress}
      style={[
        styles.customListItemWrapper,
        isMultiselect ? !isSelected && styles.selectedItemWrapper : undefined,
      ]}>
      <View
        style={[
          styles.customListItem,
          isMultiselect ? !isSelected && styles.selectedItem : undefined,
        ]}>
        <Text style={styles.indexText}>{`${index}.`}</Text>
        <Text style={styles.titleText} numberOfLines={1}>
          {city.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
