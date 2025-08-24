import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { IconButton } from '../atoms/IconButton';

interface Props {
  name: string;
  role: string;
  phone?: string;
  avatar: string;
  onPress?: () => void;
}

export const LeaderCard: React.FC<Props> = ({
  name,
  role,
  phone,
  avatar,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: avatar }} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
      {phone && <Text style={styles.phone}>{phone}</Text>}
    </View>
    <IconButton icon="phone" color="#4caf50" size={22} onPress={() => {}} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  role: { fontSize: 14, color: '#777' },
  phone: { fontSize: 13, color: '#333', marginTop: 4 },
});
