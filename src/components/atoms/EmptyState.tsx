import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

interface Props {
  message: string;
  image?: ImageSourcePropType;
}

export const EmptyState: React.FC<Props> = ({ message, image }) => (
  <View style={styles.container}>
    {image && <Image source={image} style={styles.image} />}
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: { width: 120, height: 120, marginBottom: 16, resizeMode: 'contain' },
  text: { fontSize: 16, color: '#666', textAlign: 'center' },
});
