import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../../../../constants/colors';
import {CustomListAction} from '../../../../types';

type Props = {actions?: CustomListAction[]; callback?: () => void};

export default function HeaderMenu({actions, callback}: Props) {
  return (
    <View style={styles.loaderBackground}>
      {actions?.map((action, index) => (
        <View
          style={{
            flex: 1,
            width: '100%',
            borderTopWidth: index === 0 ? 0 : 1,
            borderColor: colors.lightGrey,
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 4,
              paddingVertical: 8,
            }}
            onPress={() => {
              action.onPress?.(undefined, callback);
            }}>
            <Text
              style={{
                color: colors.textColor,
                textAlign: 'right',
                fontWeight: '500',
              }}>
              {action.name}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  loaderBackground: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    margin: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
