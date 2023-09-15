import React from 'react';
import {View} from 'react-native';

import IconButton from '@components/IconButton';
import {City, CustomListAction} from '@src/types';
import {styles} from './styles';

type Props = {city: City; actions?: CustomListAction[]; callback?: () => void};

export default function CustomListSwipeActions({
  city,
  actions,
  callback,
}: Props) {
  return (
    <View style={styles.swipeActionsBg}>
      {actions?.map(action => (
        <View style={styles.swipeActionWrapper} key={action.name}>
          <IconButton
            icon={action.icon}
            size={26}
            style={styles.swipeActionButton}
            onPress={() => {
              action.onPress?.(city, callback);
            }}
          />
        </View>
      ))}
    </View>
  );
}
