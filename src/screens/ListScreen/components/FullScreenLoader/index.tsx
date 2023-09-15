import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {colors} from '@themes/themes';
import {styles} from './styles';

export default function FullScreenLoader() {
  return (
    <View style={styles.loaderBackground}>
      <ActivityIndicator size="large" color={colors.textColor} />
    </View>
  );
}
