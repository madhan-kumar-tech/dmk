import React from 'react';
import { View, ViewStyle } from 'react-native';

export const FormSectionCard: React.FC<{
  style?: ViewStyle;
  children?: React.ReactNode;
}> = ({ style, children }) => {
  return <View style={[style]}>{children}</View>;
};
