import React, { memo } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { AppTheme } from '../../theme';
import { GradientText } from '../common';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export const OutlineButton = memo(
  ({ title, onPress, disabled, style }: Props) => (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: '#00000010' }}
      style={[
        styles.btn,
        { borderColor: AppTheme.colors.error, opacity: disabled ? 0.6 : 1 },
        style,
      ]}
    >
      <GradientText
        style={{
          color: AppTheme.colors.error,
        }}
        text={title}
      />
    </Pressable>
  ),
);

const styles = StyleSheet.create({
  btn: {
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
});
