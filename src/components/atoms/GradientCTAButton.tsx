import React, { memo } from 'react';
import { Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme, TextVariantKey } from '../../theme';
import { AppText } from '../ui/AppText';

type Props = {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  colors?: (string | number)[];
  disabled?: boolean | undefined;
  gradientStyle?: ViewStyle;
  onPress?: () => void;
  textVariant?: TextVariantKey;
  block?: boolean;
  leftIcon?: React.ReactNode;
};

export const GradientCTAButton = memo(
  ({
    title,
    style,
    textStyle,
    start = { x: 0.5, y: 0 },
    end = { x: 0.5, y: 1 },
    colors = Array.from(AppTheme.colors.ctaButtonGradient),
    disabled = false,
    block = false,
    gradientStyle,
    textVariant = 't_body',
    leftIcon,
    onPress,
  }: Props) => {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={[block ? { alignSelf: 'stretch' } : styles.self, style]}
      >
        <LinearGradient
          colors={colors}
          start={start}
          end={end}
          style={[styles.grad, gradientStyle]}
        >
          {leftIcon ? leftIcon : null}
          <AppText variant={textVariant} style={[styles.text, textStyle]}>
            {title}
          </AppText>
        </LinearGradient>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  self: { alignSelf: 'center' },
  grad: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: AppTheme.colors.primary,
  },
});
