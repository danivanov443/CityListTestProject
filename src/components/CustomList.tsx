import React from 'react';
import {FlatList} from 'react-native';
import {City} from '../types';
import CustomListItem from './CustomListItem';

type Props = {data?: City[]; onItemPress?: (city: City) => void};

export default function CustomList({data, onItemPress}: Props) {
  return (
    <>
      {data && (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <CustomListItem city={item} onPress={onItemPress} />
          )}
        />
      )}
    </>
  );
}
