import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';

type Props = {
  onSearchSubmit?: (searchQuery?: string) => void;
};

export default function CustomSearchBar({onSearchSubmit}: Props) {
  const [searchQuery, setSearchQuery] = useState<string>();

  const handleSearchSubmit = () => onSearchSubmit?.(searchQuery);

  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
        padding: 4,
      }}>
      <TextInput
        style={{flex: 1, margin: 2}}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearchSubmit}
      />
      <Button title="SEARCH" onPress={handleSearchSubmit} />
    </View>
  );
}
