import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {styles} from './styles';

export default function CircularLoader() {
  return (
    <View style={styles.loaderWrapper}>
      <ActivityIndicator size="large" />
    </View>
  );
}
