import React, {useRef, useState} from 'react';
import {EmitterSubscription, FlatList, Keyboard, View} from 'react-native';
import {PAGE_SIZE} from '../../../../constants/constants';
import {City} from '../../../../types';
import CircularLoader from '../../../../components/CircularLoader';
import CustomListItem, {ITEM_HEIGHT} from '../CustomListItem';
import SearchBar from '../../../../components/SearchBar';
import {useKeyboard} from '../../../../hooks/useKeyboard';

type Props = {
  data?: City[];
  currentPage: number;
  onItemPress?: (city: City) => void;
  onSearchSubmit?: (searchQuery?: string) => void;
  onRefresh?: () => void;
};

export default function CustomList({
  data,
  currentPage = 1,
  onItemPress,
  onSearchSubmit,
  onRefresh,
}: Props) {
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>();
  const flatListRef = useRef<FlatList>(null);

  const {isKeyboardVisible} = useKeyboard();

  const handleRefresh = () => {
    if (onRefresh) {
      setCurrentSearchQuery(undefined);
      onRefresh();
    }
  };

  const onTextInputSubmit = (searchQuery?: string) => {
    const trimmedSearchQuery = searchQuery?.trim();
    const searchNumber = Number(trimmedSearchQuery);

    const minLimit = (currentPage - 1) * PAGE_SIZE + 1;
    const maxLimit = currentPage * PAGE_SIZE;

    if (searchNumber >= minLimit && searchNumber <= maxLimit) {
      if (isKeyboardVisible) {
        let keyboardSubscription: EmitterSubscription;

        const onKeyboardDidHide = () => {
          keyboardSubscription.remove();
          flatListRef.current?.scrollToIndex({
            index: searchNumber - 1 - (currentPage - 1) * PAGE_SIZE,
          });
        };

        keyboardSubscription = Keyboard.addListener(
          'keyboardDidHide',
          onKeyboardDidHide,
        );
      } else {
        flatListRef.current?.scrollToIndex({
          index: searchNumber - 1 - (currentPage - 1) * PAGE_SIZE,
        });
      }
    } else {
      onSearchSubmit?.(trimmedSearchQuery);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        marginTop: 8,
        borderTopEndRadius: 16,
        borderTopStartRadius: 16,
      }}>
      <SearchBar
        value={currentSearchQuery}
        onChangeText={setCurrentSearchQuery}
        onSearchSubmit={onTextInputSubmit}
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
          onRefresh={handleRefresh}
          refreshing={false}
          keyExtractor={(item: City) => item.id}
          renderItem={({item, index}) => (
            <CustomListItem
              index={(currentPage - 1) * PAGE_SIZE + index + 1}
              city={item}
              onPress={onItemPress}
            />
          )}
        />
      ) : (
        <CircularLoader />
      )}
    </View>
  );
}
