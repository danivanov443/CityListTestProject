import {StyleSheet} from 'react-native';

import {colors} from '@themes/themes';

export const styles = StyleSheet.create({
  headerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textColor,
  },
});
