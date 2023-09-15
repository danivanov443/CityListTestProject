import {StyleSheet} from 'react-native';

import {colors} from '@themes/themes';

export const styles = StyleSheet.create({
  headerMenuBackground: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    margin: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerMenuButton: {
    flex: 1,
    width: '100%',
    borderTopWidth: 1,
    borderColor: colors.lightGrey,
  },
  headerMenuButtonFirst: {
    flex: 1,
    width: '100%',
    borderTopWidth: 0,
    borderColor: colors.lightGrey,
  },
  headerMenuButtonTouchable: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  headerMenuButtonText: {
    color: colors.textColor,
    textAlign: 'right',
    fontWeight: '500',
  },
});
