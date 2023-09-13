import React, {useRef, useState} from 'react';
import {
  EmitterSubscription,
  FlatList,
  Keyboard,
  Text,
  View,
} from 'react-native';
import {PAGE_SIZE} from '../../../../constants/constants';
import {City, CustomListAction} from '../../../../types';
import CircularLoader from '../../../../components/CircularLoader';
import CustomListItem, {ITEM_HEIGHT} from '../CustomListItem';
import SearchBar from '../../../../components/SearchBar';
import {useKeyboard} from '../../../../hooks/useKeyboard';
import IconButton from '../../../../components/IconButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import CustomListSwipeActions from '../CustomListSwipeActions';

type Props = {
  data?: City[];
  currentPage: number;
  onItemPress?: (city: City) => void;
  onSearchSubmit?: (searchQuery?: string) => void;
  onRefresh?: () => void;
  actions?: CustomListAction[];
};

export default function CustomList({
  data,
  currentPage = 1,
  onItemPress,
  onSearchSubmit,
  onRefresh,
  actions,
}: Props) {
  const [isSwipeList, setIsSwipeList] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>();
  const flatListRef = useRef<FlatList>(null);
  const swipeListRef = useRef<SwipeListView<City>>(null);
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

    if (searchNumber >= minLimit && searchNumber <= maxLimit && !isSwipeList) {
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

  // const renderOnSwipeActions = (actions: any[]) => (
  //   <View style={{flexDirection: 'row'}}>
  //     {actions.map(action => (
  //       <Text>1</Text>
  //     ))}
  //   </View>
  // );

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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <IconButton
          icon={isSwipeList ? 'toggle-on' : 'toggle-off'}
          size={22}
          onPress={() => setIsSwipeList(prev => !prev)}
        />
        <Text>{isSwipeList ? 'Режим SwipeList' : 'Режим FlatList'}</Text>
      </View>
      {data?.length ? (
        isSwipeList ? (
          <SwipeListView
            style={{flex: 1, backgroundColor: '#EEEEEE'}}
            ref={swipeListRef}
            data={data}
            getItemLayout={(_data: any, index: number) => ({
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
            renderHiddenItem={(_data, _rowMap) => (
              <CustomListSwipeActions actions={actions} />
            )}
            disableRightSwipe
            rightOpenValue={actions ? -40 * actions?.length - 5 : 0}
          />
        ) : (
          <FlatList
            style={{flex: 1}}
            ref={flatListRef}
            data={data}
            getItemLayout={(_data, index) => ({
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
        )
      ) : (
        <CircularLoader />
      )}
    </View>
  );
}
