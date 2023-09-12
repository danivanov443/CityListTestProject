import React from 'react';
import {TextInput, View} from 'react-native';
import IconButton from '../IconButton';
import {styles} from './styles';

type Props = {
  value?: string;
  placeholder?: string;
  onChangeText?: (value: string) => void;
  onSearchSubmit?: (searchQuery?: string) => void;
};

export default function SearchBar({
  value,
  placeholder,
  onChangeText,
  onSearchSubmit,
}: Props) {
  const handleSearchSubmit = () => onSearchSubmit?.(value);

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
