import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

export default function NoResults() {
  return (
    <View style={styles.noResultsBackground}>
      <Text style={styles.noResultsText}>Ничего не найдено</Text>
    </View>
  );
}
