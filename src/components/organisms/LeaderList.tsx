import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { LeaderCard } from '../molecules/LeaderCard';

interface Leader {
  id: string;
  name: string;
  role: string;
  avatar: string;
  phone?: string;
}

interface Props {
  data: Leader[];
}

export const LeaderList: React.FC<Props> = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <LeaderCard {...item} />}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
);

const styles = StyleSheet.create({
  separator: { height: 10 },
});
