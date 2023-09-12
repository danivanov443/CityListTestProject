import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {MainStackParamList} from '../../../App';
import {getData} from '../../api';
import CustomList from '../../components/CustomList';
import {City} from '../../types';

type Props = NativeStackScreenProps<MainStackParamList, 'List'>;

export default function ListScreen({navigation}: Props) {
  const [cityData, setCityData] = useState<City[]>();

  const loadData = async () => {
    const data = await getData();
    console.log(data[0]);
    if (data) {
      setCityData(data);
    }
  };

  const onItemPress = (city: City) => {
    navigation.navigate('Details', {id: city.id});
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {cityData ? (
        <CustomList data={cityData} onItemPress={onItemPress} />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}
