import React, {useRef, useState} from 'react';
import {
  EmitterSubscription,
  FlatList,
  Keyboard,
  Switch,
  Text,
  View,
} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';

import {City, CustomListAction} from '@src/types';
import {PAGE_SIZE} from '@constants/constants';
import CircularLoader from '@components/CircularLoader';
import HorizontalLoader from '@components/HorizontalLoader';
import SearchBar from '@components/SearchBar';
import {useKeyboard} from '@hooks/useKeyboard';
import {styles} from './styles';
import CustomListItem, {ITEM_HEIGHT} from '../CustomListItem';
import CustomListSwipeActions from '../CustomListSwipeActions';
import NoResults from '../NoResults';

type Props = {
  data?: City[];
  selectedData?: City[];
  currentPage: number;
  actions?: CustomListAction[];
  showProgressBar?: boolean;
  onItemPress?: (city: City) => void;
  onItemLongPress?: (city: City) => void;
  onSearchSubmit?: (searchQuery?: string) => void;
  onRefresh?: () => void;
  onEndReached?: (searchQuery?: string) => void;
  onModeChange?: () => void;
};

export default function CustomList({
  data,
  selectedData,
  currentPage = 1,
  actions,
  showProgressBar,
  onItemPress,
  onItemLongPress,
  onSearchSubmit,
  onRefresh,
  onEndReached,
  onModeChange,
}: Props) {
  const [isSwipeList, setIsSwipeList] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>();
  const flatListRef = useRef<FlatList>(null);
  const swipeListRef = useRef<SwipeListView<City>>(null);
  const {isKeyboardVisible} = useKeyboard();

  const selectedIds = selectedData?.map(value => value.id);

  const handleModeChange = () => {
    setIsSwipeList(prev => !prev);
    onModeChange?.();
  };

  const handleRefresh = () => {
    if (onRefresh) {
      setCurrentSearchQuery(undefined);
      onRefresh();
    }
  };

  const onTextInputSubmit = (searchQuery?: string) => {
    const trimmedSearchQuery = searchQuery?.trim();
    const searchNumber = Number(trimmedSearchQuery);

    const minLimit = 1;
    const maxLimit = currentPage * PAGE_SIZE;

    if (searchNumber >= minLimit && searchNumber <= maxLimit && !isSwipeList) {
      if (isKeyboardVisible) {
        let keyboardSubscription: EmitterSubscription;

        const onKeyboardDidHide = () => {
          keyboardSubscription.remove();
          flatListRef.current?.scrollToIndex({
            index: searchNumber - 1,
          });
        };

        keyboardSubscription = Keyboard.addListener(
          'keyboardDidHide',
          onKeyboardDidHide,
        );
      } else {
        flatListRef.current?.scrollToIndex({
          index: searchNumber - 1,
        });
      }
    } else {
      onSearchSubmit?.(trimmedSearchQuery);
    }
  };

  const handleCloseSwipedItem = () => {
    swipeListRef.current?.closeAllOpenRows();
  };

  return (
    <View style={styles.customListWrapper}>
      <SearchBar
        value={currentSearchQuery}
        onChangeText={setCurrentSearchQuery}
        onSearchSubmit={onTextInputSubmit}
      />
      <HorizontalLoader isHidden={!showProgressBar} />
      <View style={styles.switchWrapper}>
        <Switch
          value={isSwipeList}
          onChange={handleModeChange}
          style={styles.switch}
        />
        <Text style={styles.switchText}>
          {`Режим: ${isSwipeList ? 'SwipeList' : 'FlatList'}`}
        </Text>
      </View>
      {data?.length ? (
        isSwipeList ? (
          <SwipeListView
            style={styles.list}
            ref={swipeListRef}
            data={data}
            getItemLayout={(_data: any, index: number) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            onRefresh={handleRefresh}
            refreshing={false}
            onEndReached={() => onEndReached?.(currentSearchQuery)}
            onEndReachedThreshold={1}
            keyExtractor={(item: City) => item.id}
            renderItem={({item, index}) => (
              <CustomListItem
                index={index + 1}
                city={item}
                onPress={onItemPress}
              />
            )}
            renderHiddenItem={(itemData, _rowMap) => (
              <CustomListSwipeActions
                city={itemData.item}
                actions={actions}
                callback={handleCloseSwipedItem}
              />
            )}
            disableRightSwipe
            rightOpenValue={actions ? -40 * actions?.length - 5 : 0}
          />
        ) : (
          <FlatList
            style={styles.list}
            ref={flatListRef}
            data={data}
            getItemLayout={(_data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            onRefresh={handleRefresh}
            onEndReached={() => onEndReached?.(currentSearchQuery)}
            onEndReachedThreshold={1}
            refreshing={false}
            keyExtractor={(item: City) => item.id}
            renderItem={({item, index}) => (
              <CustomListItem
                selected={selectedIds?.includes(item.id)}
                index={index + 1}
                city={item}
                onPress={onItemPress}
                onLongPress={onItemLongPress}
              />
            )}
          />
        )
      ) : data?.length === 0 ? (
        <NoResults />
      ) : (
        <CircularLoader />
      )}
    </View>
  );
}
