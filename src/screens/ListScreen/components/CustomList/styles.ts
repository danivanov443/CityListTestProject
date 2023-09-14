import {StyleSheet} from 'react-native';
import {colors} from '../../../../constants/colors';

export const styles = StyleSheet.create({
  customListWrapper: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 8,
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    paddingStart: 4,
  },
  switch: {marginEnd: 8},
  switchText: {color: colors.textColor, fontSize: 12},
  list: {flex: 1, backgroundColor: colors.bgColor},
});
