import React, {useCallback} from 'react';
import {TextInput, View} from 'react-native';

import IconButton from '@components/IconButton';
import {styles} from './styles';

type Props = {
  value?: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
  onSubmitEditing?: (searchQuery?: string) => void;
};

export default function SearchBar({
  value,
  placeholder,
  onChangeText,
  onSubmitEditing,
}: Props) {
  const handleSearchSubmit = useCallback(
    () => onSubmitEditing?.(value),
    [onSubmitEditing, value],
  );

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        onSubmitEditing={handleSearchSubmit}
      />
      <IconButton icon="search" onPress={handleSearchSubmit} />
    </View>
  );
}
