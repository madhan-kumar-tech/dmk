import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { AppTheme } from '../../theme';

type Props = { label: string; value: string };
export const InfoRow = memo(({ label, value }: Props) => (
  <View style={styles.row}>
    <Text style={[styles.label]}>{label}</Text>
    <Text style={styles.colon}>:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
));

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  label: {
    width: 110,
    fontSize: 18,
    fontWeight: '700',
    color: AppTheme.colors.text.dark,
    fontFamily: AppTheme.typography.fontFamilies.tamilSans,
  },
  colon: { width: 14, textAlign: 'center', fontSize: 18, color: '#7a7a7a' },
  value: {
    flex: 1,
    fontSize: 18,
    color: '#222',
    fontFamily: AppTheme.typography.fontFamilies.tamilSans,
  },
});
