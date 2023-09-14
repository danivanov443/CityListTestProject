import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {CustomListAction} from '../../../../types';
import {styles} from './styles';

type Props = {actions?: CustomListAction[]; callback?: () => void};

export default function HeaderMenu({actions, callback}: Props) {
  return (
    <View style={styles.headerMenuBackground}>
      {actions?.map((action, index) => (
        <View
          style={[
            styles.headerMenuButton,
            index === 0 && styles.headerMenuButtonFirst,
          ]}
          key={action.name}>
          <TouchableOpacity
            style={styles.headerMenuButtonTouchable}
            onPress={() => {
              action.onPress?.(undefined, callback);
            }}>
            <Text style={styles.headerMenuButtonText}>{action.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
