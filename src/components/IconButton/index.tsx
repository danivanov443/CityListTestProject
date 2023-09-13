import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants/colors';
import {styles} from './styles';

type Props = {
  style?: StyleProp<ViewStyle>;
  icon: string;
  size?: number;
  onPress?: () => void;
};

export default function IconButton({style, icon, size = 26, onPress}: Props) {
  return (
    <View style={[styles.iconButtonWrapper, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.iconButton}
        disabled={!onPress}>
        <Icon name={icon} size={size} color={colors.icon} />
      </TouchableOpacity>
    </View>
  );
}
