import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  placeholder = 'Search...',
}) => (
  <View style={styles.container}>
    <IconButton icon={'search'} />
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  input: { flex: 1, fontSize: 16, marginLeft: 6 },
});
