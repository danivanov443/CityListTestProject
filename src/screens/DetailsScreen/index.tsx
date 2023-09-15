/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect} from 'react';
import {View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {MainStackParamList} from '@navigation/navigation';
import Header from '@components/Header';
import CityDetails from './components/CityDetails';
import {styles} from './styles';

type Props = NativeStackScreenProps<MainStackParamList, 'Details'>;

export default function DetailScreen({navigation, route}: Props) {
  const city = route.params.city;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Header text={city.title} />,
    });
  }, [city.title, navigation]);

  return (
    <View style={styles.detailsScreenView}>
      <CityDetails city={city} />
    </View>
  );
}
