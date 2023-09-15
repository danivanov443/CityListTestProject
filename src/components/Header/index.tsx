import React from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';

type Props = {
  text?: string;
};

export default function Header({text = 'City List'}: Props) {
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerText}>{text}</Text>
    </View>
  );
}
