import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants/colors';
import {styles} from './styles';

type Props = {
  icon: string;
  size?: number;
  onPress?: () => void;
};

export default function IconButton({icon, size = 26, onPress}: Props) {
  return (
    <View style={styles.iconButtonWrapper}>
      <TouchableOpacity onPress={onPress} style={styles.iconButton}>
        <Icon name={icon} size={size} color={colors.icon} />
      </TouchableOpacity>
    </View>
  );
}
