import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {MainStackParamList} from '../../../App';
import {getData} from '../../api';
import CustomList from '../../components/CustomList';
import {City} from '../../types';

type Props = NativeStackScreenProps<MainStackParamList, 'List'>;

export default function ListScreen({navigation}: Props) {
  const [cityData, setCityData] = useState<City[]>();

  const loadData = async (
    searchQuery?: string,
    pageNumber?: number,
    pageSize?: number,
  ) => {
    setCityData([]);
    const data = await getData(pageNumber, pageSize, searchQuery);
    setCityData(data);
  };

  const onSearchSubmit = (searchQuery: string) => {
    loadData(searchQuery);
  };

  const onItemPress = (city: City) => {
    navigation.navigate('Details', {id: city.id});
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <CustomList
        data={cityData}
        onItemPress={onItemPress}
        onSearchSubmit={onSearchSubmit}
      />
    </View>
  );
}
