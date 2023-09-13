import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {MainStackParamList} from '../../../App';
import {getCities} from '../../api';
import CustomList from './components/CustomList';
import {PAGE_SIZE} from '../../constants';
import {City} from '../../types';

type Props = NativeStackScreenProps<MainStackParamList, 'List'>;

export default function ListScreen({navigation}: Props) {
  const [cityData, setCityData] = useState<City[]>();
  const [currentPage, setCurrentPage] = useState(1);

  const loadData = async (
    searchQuery?: string,
    pageNumber?: number,
    pageSize?: number,
  ) => {
    setCityData([]);
    const data = await getCities(pageNumber, pageSize, searchQuery);
    setCityData(data);
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    loadData(undefined, currentPage, PAGE_SIZE);
  };

  const handleSearchSubmit = (searchQuery?: string) => {
    setCurrentPage(1);
    loadData(searchQuery, currentPage, PAGE_SIZE);
  };

  const handleItemPress = (city: City) => {
    navigation.navigate('Details', {city});
  };

  useEffect(() => {
    loadData(undefined, currentPage, PAGE_SIZE);
  }, [currentPage]);

  return (
    <View style={{flex: 1}}>
      <CustomList
        currentPage={currentPage}
        data={cityData}
        onItemPress={handleItemPress}
        onSearchSubmit={handleSearchSubmit}
        onRefresh={handleRefresh}
      />
    </View>
  );
}
