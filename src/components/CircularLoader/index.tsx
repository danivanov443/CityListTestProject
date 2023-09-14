import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {colors} from '../../constants/colors';
import {styles} from './styles';

export default function CircularLoader() {
  return (
    <View style={styles.loaderWrapper}>
      <ActivityIndicator size="large" color={colors.loader} />
    </View>
  );
}
