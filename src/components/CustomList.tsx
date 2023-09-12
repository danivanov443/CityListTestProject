import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  TextInput,
  View,
} from 'react-native';
import {City} from '../types';
import CustomListItem from './CustomListItem';

type Props = {
  data?: City[];
  onItemPress?: (city: City) => void;
  onSearchSubmit?: (searchQuery: string) => void;
};

const ITEM_HEIGHT = 43;

export default function CustomList({data, onItemPress, onSearchSubmit}: Props) {
  const [searchQuery, setSearchQuery] = useState<string>();
  const flatListRef = useRef<FlatList>(null);

  const onTextInputSubmit = () => {
    const trimmedSearchQuery = searchQuery?.trim();
    const searchNumber = Number(trimmedSearchQuery);
    if (searchNumber >= 1 && searchNumber <= 50) {
      const onKeyboardDidHide = () => {
        Keyboard.removeAllListeners('keyboardDidHide');
        flatListRef.current?.scrollToIndex({
          index: searchNumber - 1,
        });
      };

      Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    } else {
      if (trimmedSearchQuery) {
        onSearchSubmit?.(trimmedSearchQuery);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <TextInput
        style={{margin: 8, backgroundColor: 'white'}}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={onTextInputSubmit}
      />

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
          renderItem={({item, index}) => (
            <CustomListItem
              index={index + 1}
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
