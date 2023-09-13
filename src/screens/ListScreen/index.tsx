import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {MainStackParamList} from '../../../App';
import {getCities} from '../../api';
import CustomList from './components/CustomList';
import {PAGE_SIZE} from '../../constants/constants';
import {City, CustomListAction} from '../../types';
import IconButton from '../../components/IconButton';

type Props = NativeStackScreenProps<MainStackParamList, 'List'>;

export default function ListScreen({navigation}: Props) {
  const [isMultiselect, setIsMultiselect] = useState(false);
  const [cityData, setCityData] = useState<City[]>();
  const [currentPage, setCurrentPage] = useState(1);

  const singleItemActions: CustomListAction[] = [
    {
      name: 'Copy',
      icon: 'content-copy',
      onPress: () => console.log('Copy'),
    },
    {
      name: 'Edit',
      icon: 'edit',
      onPress: () => console.log('Edit'),
    },
    {
      name: 'View',
      icon: 'preview',
      onPress: () => console.log('View'),
    },
    // {
    //   name: 'Like',
    //   icon: 'favorite',
    //   onPress: () => console.log('Like'),
    // },
    // {
    //   name: 'Delete',
    //   icon: 'delete',
    //   onPress: () => console.log('Delete'),
    // },
  ];

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

  useEffect(() => {
    if (isMultiselect) {
      navigation.setOptions({
        headerLeft: () => <IconButton icon="close" />,
        headerRight: () => <IconButton icon="more-vert" />,
      });
    } else {
      navigation.setOptions({
        headerLeft: undefined,
        headerRight: undefined,
      });
    }
  }, [navigation, isMultiselect]);

  return (
    <View style={{flex: 1}}>
      <CustomList
        currentPage={currentPage}
        data={cityData}
        onItemPress={handleItemPress}
        onSearchSubmit={handleSearchSubmit}
        onRefresh={handleRefresh}
        actions={singleItemActions}
      />
    </View>
  );
}
