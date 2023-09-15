import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {colors} from '@themes/themes';
import {styles} from './styles';

type Props = {
  style?: StyleProp<ViewStyle>;
  icon: string;
  size?: number;
  disabled?: boolean;
  onPress: () => void;
};

export default function IconButton({
  style,
  icon,
  size = 26,
  disabled = false,
  onPress,
}: Props) {
  return (
    <View style={[styles.iconButtonWrapper, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.iconButton}
        disabled={disabled}>
        <Icon name={icon} size={size} color={colors.icon} />
      </TouchableOpacity>
    </View>
  );
}
