import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { makeStyles } from '../../theme/responsive';

type Props = { label: string; value?: string | number };
export const LabelValueRow: React.FC<Props> = ({ label, value }) => {
  const s = useStyles();
  return (
    <View style={s.row}>
      <Text style={s.label}>{label}</Text>
      <Text style={s.sep}>:</Text>
      <Text style={s.value}>{value ?? '-'}</Text>
    </View>
  );
};
const useStyles = makeStyles(() => ({
  row: { flexDirection: 'row', paddingVertical: 8 } satisfies ViewStyle,
  label: {
    width: 110,
    fontSize: 18,
    fontWeight: '700',
    color: '#121212',
  } satisfies TextStyle,
  sep: {
    width: 12,
    textAlign: 'center',
    fontSize: 18,
    color: '#121212',
  } satisfies TextStyle,
  value: { flex: 1, fontSize: 18, color: '#222' } satisfies TextStyle,
}));
