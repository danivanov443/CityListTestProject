import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {MainStackParamList} from '../../../App';
import {getData} from '../../api';
import CustomList from '../../components/CustomList';
import {PAGE_SIZE} from '../../constants';
import {City} from '../../types';

type Props = NativeStackScreenProps<MainStackParamList, 'List'>;

export default function ListScreen({navigation}: Props) {
  const [cityData, setCityData] = useState<City[]>();
  const [currentPage, setCurrentPage] = useState(20);

  const loadData = async (
    searchQuery?: string,
    pageNumber?: number,
    pageSize?: number,
  ) => {
    setCityData([]);
    const data = await getData(pageNumber, pageSize, searchQuery);
    setCityData(data);
  };

  const onRefresh = () => {
    setCurrentPage(1);
    loadData(undefined, currentPage, PAGE_SIZE);
  };

  const onSearchSubmit = (searchQuery?: string) => {
    setCurrentPage(1);
    loadData(searchQuery, currentPage, PAGE_SIZE);
  };

  const onItemPress = (city: City) => {
    navigation.navigate('Details', {id: city.id});
  };

  useEffect(() => {
    loadData(undefined, currentPage, PAGE_SIZE);
  }, [currentPage]);

  return (
    <View style={{flex: 1}}>
      <CustomList
        currentPage={currentPage}
        data={cityData}
        onItemPress={onItemPress}
        onSearchSubmit={onSearchSubmit}
        onRefresh={onRefresh}
      />
    </View>
  );
}
