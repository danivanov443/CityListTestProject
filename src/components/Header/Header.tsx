import React from 'react';
import {Text, View} from 'react-native';
import {colors} from '../../constants/colors';

type Props = {
  text?: string;
};

export default function Header({text = 'City List'}: Props) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: colors.textColor,
        }}>
        {text}
      </Text>
    </View>
  );
}
