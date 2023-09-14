import React from 'react';
import {Dimensions, View} from 'react-native';
import {Bar} from 'react-native-progress';
import {colors} from '../../constants/colors';
import {styles} from './styles';

const HORIZONTAL_MARGIN = 16;

type Props = {
  isHidden?: boolean;
};

export default function HorizontalLoader({isHidden = false}: Props) {
  const windowWidth = Dimensions.get('window').width;
  return (
    <View style={styles.progressBarWrapper}>
      <Bar
        useNativeDriver
        indeterminate
        width={windowWidth - HORIZONTAL_MARGIN * 2}
        height={4}
        color={colors.loader}
        style={isHidden ? styles.progressBarHide : styles.progressBarShow}
      />
    </View>
  );
}
