import {colors} from '../../../../constants/colors';
import {StyleSheet} from 'react-native';

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
