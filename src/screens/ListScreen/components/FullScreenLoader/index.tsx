import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors} from '../../../../constants/colors';

export default function FullScreenLoader() {
  return (
    <View style={styles.loaderBackground}>
      <ActivityIndicator size="large" color={colors.textColor} />
    </View>
  );
}
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
