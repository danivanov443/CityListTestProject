import {StyleSheet} from 'react-native';
import {ITEM_HEIGHT} from '.';

import {colors} from '@themes/themes';

export const styles = StyleSheet.create({
  customListItem: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: colors.lightGrey,
    flexDirection: 'row',
  },
  selectedItem: {
    borderColor: colors.mediumGrey,
  },
  customListItemWrapper: {
    height: ITEM_HEIGHT,
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  selectedItemWrapper: {
    backgroundColor: colors.selectedBg,
  },
  indexText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textColor,
    marginEnd: 8,
  },
  titleText: {
    fontSize: 14,
    color: colors.textColor,
  },
});
