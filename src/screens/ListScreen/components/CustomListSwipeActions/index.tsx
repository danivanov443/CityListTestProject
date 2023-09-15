import React from 'react';
import {View} from 'react-native';

import IconButton from '@components/IconButton';
import {CustomListAction} from '@src/types';
import {styles} from './styles';

type Props = {actions?: CustomListAction[]; onPress: (...args: any[]) => void};

export default function CustomListSwipeActions({actions, onPress}: Props) {
  return (
    <View style={styles.swipeActionsBg}>
      {actions?.map(action => (
        <View style={styles.swipeActionWrapper} key={action.name}>
          <IconButton
            icon={action.icon}
            size={26}
            style={styles.swipeActionButton}
            onPress={() => onPress(action)}
          />
        </View>
      ))}
    </View>
  );
}
