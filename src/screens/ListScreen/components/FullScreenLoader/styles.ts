import {StyleSheet} from 'react-native';

import {colors} from '@themes/themes';

export const styles = StyleSheet.create({
  loaderBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: colors.lightGrey,
    opacity: 0.5,
  },
});
