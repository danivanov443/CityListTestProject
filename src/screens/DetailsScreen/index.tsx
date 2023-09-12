import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text} from 'react-native';
import {MainStackParamList} from '../../../App';

type Props = NativeStackScreenProps<MainStackParamList, 'Details'>;

export default function DetailScreen({route}: Props) {
  const id = route.params.id;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Detail Screen</Text>
      <Text>{id}</Text>
    </View>
  );
}
