import {StyleSheet} from 'react-native';

import {colors} from '@themes/themes';

export const styles = StyleSheet.create({
  noResultsBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    color: colors.mediumGrey,
    marginBottom: 64,
  },
});
