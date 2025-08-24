import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export const Loader: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#d32f2f" />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
