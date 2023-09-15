import React from 'react';
import {View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {MainStackParamList} from '@navigation/navigation';
import CityDetails from './components/CityDetails';
import {styles} from './styles';

type Props = NativeStackScreenProps<MainStackParamList, 'Details'>;

export default function DetailScreen({route}: Props) {
  const city = route.params.city;

  return (
    <View style={styles.detailsScreenView}>
      <CityDetails city={city} />
    </View>
  );
}
