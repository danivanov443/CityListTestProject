import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  text?: string;
};

export default function Header({text}: Props) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
      }}>
      <Text>{text}</Text>
    </View>
  );
}
