import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {City} from '../types';

type Props = {index: number; city: City; onPress?: (city: City) => void};

export default function CustomListItem({index, city, onPress}: Props) {
  return (
    <TouchableOpacity onPress={() => onPress?.(city)} style={{margin: 6}}>
      <View style={{padding: 6, backgroundColor: 'red'}}>
        <Text>{`${index}. ${city.title}`}</Text>
      </View>
    </TouchableOpacity>
  );
}
