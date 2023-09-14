import React from 'react';
import {View} from 'react-native';
import IconButton from '../../../../components/IconButton';
import {City, CustomListAction} from '../../../../types';

type Props = {city: City; actions?: CustomListAction[]; callback?: () => void};

export default function CustomListSwipeActions({
  city,
  actions,
  callback,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      {actions?.map(action => (
        <View
          style={{
            width: 35,
            height: 35,
            marginRight: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={action.name}>
          <IconButton
            icon={action.icon}
            size={26}
            style={{margin: 0}}
            onPress={() => {
              action.onPress?.(city, callback);
            }}
          />
        </View>
      ))}
    </View>
  );
}
