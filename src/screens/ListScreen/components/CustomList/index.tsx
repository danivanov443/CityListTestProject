import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  EmitterSubscription,
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  Switch,
  Text,
  View,
} from 'react-native';

import {RowMap, SwipeListView} from 'react-native-swipe-list-view';

import {City, CustomListAction} from '@src/types';
import {ITEM_HEIGHT} from '@constants/constants';
import CircularLoader from '@components/CircularLoader';
import HorizontalLoader from '@components/HorizontalLoader';
import SearchBar from '@components/SearchBar';
import {useKeyboard} from '@hooks/useKeyboard';
import {styles} from './styles';
import CustomListItem from '../CustomListItem';
import CustomListSwipeActions from '../CustomListSwipeActions';
import NoResults from '../NoResults';

type Props = {
  data?: City[];
  isMultiselect: boolean;
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
  isMultiselect = false,
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

  const handleModeChange = useCallback(() => {
    setIsSwipeList(prev => !prev);
    onModeChange?.();
  }, [onModeChange]);

  const handleRefresh = useCallback(() => {
    if (onRefresh) {
      setCurrentSearchQuery(undefined);
      onRefresh();
    }
  }, [onRefresh]);

  const handleEndReached = useCallback(() => {
    onEndReached?.(currentSearchQuery);
  }, [currentSearchQuery, onEndReached]);

  const onTextInputSubmit = useCallback(
    (searchQuery?: string) => {
      const trimmedSearchQuery = searchQuery?.trim();
      const searchNumber = Number(trimmedSearchQuery);

      const minLimit = 1;
      const maxLimit = data?.length ?? 0;

      if (
        searchNumber >= minLimit &&
        searchNumber <= maxLimit &&
        !isSwipeList
      ) {
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
    },
    [data?.length, isKeyboardVisible, isSwipeList, onSearchSubmit],
  );

  const handleCloseSwipedItem = () => {
    swipeListRef.current?.closeAllOpenRows();
  };

  const getItemLayout = useCallback(
    (_data: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const keyExtractor = useCallback((item: City) => item.id, []);

  const renderItem = useCallback(
    ({item, index}: {item: City; index: number}) => (
      <CustomListItem
        isMultiselect={isMultiselect}
        index={index + 1}
        city={item}
        onSelect={() => onItemPress?.(item)}
        onToggleMultiselect={
          isSwipeList ? undefined : () => onItemLongPress?.(item)
        }
      />
    ),
    [isSwipeList, onItemLongPress, onItemPress, isMultiselect],
  );

  const renderHiddenItem = useCallback(
    (itemData: ListRenderItemInfo<City>, _rowMap: RowMap<City>) => (
      <CustomListSwipeActions
        actions={actions}
        onPress={(action: CustomListAction) =>
          action.onPress?.(itemData.item, handleCloseSwipedItem)
        }
      />
    ),
    [actions],
  );

  const customListContent = useMemo(() => {
    if (!data) {
      return <CircularLoader />;
    }
    if (data.length === 0) {
      return <NoResults />;
    }
    if (isSwipeList) {
      return (
        <SwipeListView
          style={styles.list}
          ref={swipeListRef}
          data={data}
          getItemLayout={getItemLayout}
          onRefresh={handleRefresh}
          refreshing={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={1}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          disableRightSwipe
          rightOpenValue={actions ? -40 * actions?.length - 5 : 0}
        />
      );
    }
    return (
      <FlatList
        style={styles.list}
        ref={flatListRef}
        data={data}
        getItemLayout={getItemLayout}
        onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        onEndReachedThreshold={1}
        refreshing={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    );
  }, [
    actions,
    data,
    getItemLayout,
    handleEndReached,
    handleRefresh,
    isSwipeList,
    keyExtractor,
    renderHiddenItem,
    renderItem,
  ]);

  return (
    <View style={styles.customListWrapper}>
      <SearchBar
        value={currentSearchQuery}
        onChangeText={setCurrentSearchQuery}
        onSubmitEditing={onTextInputSubmit}
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
      {customListContent}
    </View>
  );
}
