import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Keyboard,
  TextInput,
  View,
} from 'react-native';
import {PAGE_SIZE} from '../constants';
import {City} from '../types';
import CustomListItem from './CustomListItem';

type Props = {
  data?: City[];
  currentPage: number;
  onItemPress?: (city: City) => void;
  onSearchSubmit?: (searchQuery?: string) => void;
  onRefresh?: () => void;
};

const ITEM_HEIGHT = 43;

export default function CustomList({
  data,
  currentPage = 1,
  onItemPress,
  onSearchSubmit,
  onRefresh,
}: Props) {
  const [searchQuery, setSearchQuery] = useState<string>();
  const flatListRef = useRef<FlatList>(null);

  const onTextInputSubmit = () => {
    const trimmedSearchQuery = searchQuery?.trim();
    const searchNumber = Number(trimmedSearchQuery);

    const minLimit = (currentPage - 1) * PAGE_SIZE + 1;
    const maxLimit = currentPage * PAGE_SIZE;

    console.log(minLimit, maxLimit);

    if (searchNumber >= minLimit && searchNumber <= maxLimit) {
      console.log(searchNumber - 1 - (currentPage - 1) * PAGE_SIZE);
      const onKeyboardDidHide = () => {
        Keyboard.removeAllListeners('keyboardDidHide');
        flatListRef.current?.scrollToIndex({
          index: searchNumber - 1 - (currentPage - 1) * PAGE_SIZE,
        });
      };

      Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    } else {
      onSearchSubmit?.(trimmedSearchQuery);
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          margin: 4,
          padding: 4,
        }}>
        <TextInput
          style={{flex: 1, margin: 2}}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={onTextInputSubmit}
        />
        <Button title="SEARCH" onPress={onTextInputSubmit} />
      </View>

      {data?.length ? (
        <FlatList
          style={{flex: 1}}
          ref={flatListRef}
          data={data}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          onRefresh={onRefresh}
          refreshing={false}
          renderItem={({item, index}) => (
            <CustomListItem
              index={(currentPage - 1) * PAGE_SIZE + index + 1}
              city={item}
              onPress={onItemPress}
            />
          )}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}
