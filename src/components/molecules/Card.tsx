import React from 'react';
import { View, ViewStyle } from 'react-native';
import { makeStyles } from '../../theme/responsive';
export const Card: React.FC<{
  style?: ViewStyle;
  children: React.ReactNode;
}> = ({ children, style }) => {
  const s = useStyles();
  return <View style={[s.card, style]}>{children}</View>;
};
const useStyles = makeStyles(() => ({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  } satisfies ViewStyle,
}));
