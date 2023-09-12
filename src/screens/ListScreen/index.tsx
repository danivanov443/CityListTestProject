import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {MainStackParamList} from '../../../App';

type Props = NativeStackScreenProps<MainStackParamList, 'List'>;

export default function ListScreen({navigation}: Props) {
  const onPress = () => {
    navigation.navigate('Details');
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>List Screen</Text>
      <Button onPress={onPress} title="to Details" />
    </View>
  );
}
