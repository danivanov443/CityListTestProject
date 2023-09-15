import React from 'react';
import {View} from 'react-native';

import {Bar} from 'react-native-progress';

import {colors} from '@themes/themes';
import {SCREEN_WIDTH} from '@constants/constants';
import {styles} from './styles';

const HORIZONTAL_MARGIN = 16;

type Props = {
  isHidden?: boolean;
};

export default function HorizontalLoader({isHidden = false}: Props) {
  return (
    <View style={styles.progressBarWrapper}>
      <Bar
        useNativeDriver
        indeterminate
        width={SCREEN_WIDTH - HORIZONTAL_MARGIN * 2}
        height={4}
        color={colors.loader}
        style={isHidden ? styles.progressBarHide : styles.progressBarShow}
      />
    </View>
  );
}
