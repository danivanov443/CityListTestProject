import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseToast, BaseToastProps} from 'react-native-toast-message';
import {colors} from './constants/colors';

export const toastConfig = {
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.toastContainer}
      text1Style={styles.toastText1}
      text2Style={styles.toastText2}
    />
  ),
};

const styles = StyleSheet.create({
  errorToast: {
    backgroundColor: colors.error,
    borderLeftWidth: 0,
    borderRadius: 16,
    width: undefined,
    height: 40,
  },
  toastContainer: {
    flex: 0,
    padding: 0,
    margin: 0,
  },
  toastText1: {
    fontSize: 14,
    color: 'white',
  },
  toastText2: {
    fontSize: 12,
    color: 'white',
  },
});
