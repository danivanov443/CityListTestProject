import {StyleSheet} from 'react-native';

import {ITEM_HEIGHT} from '@constants/constants';

export const styles = StyleSheet.create({
  swipeActionsBg: {
    flexDirection: 'row',
    flex: 1,
    height: ITEM_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  swipeActionWrapper: {
    width: 35,
    height: 35,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeActionButton: {margin: 0},
});
