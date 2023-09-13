import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {MainStackParamList} from '../../../App';
import CityDetails from './components/CityDetails';

type Props = NativeStackScreenProps<MainStackParamList, 'Details'>;

export default function DetailScreen({route}: Props) {
  const city = route.params.city;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <CityDetails city={city} />
    </View>
  );
}
