import React from 'react';
import { View, StyleSheet, PixelRatio, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme } from '../../theme';

type Props = {
  children?: React.ReactNode;
  style?: ViewStyle;
  borderColors?: string[];
  backgroundColor?: string;
  borderRadius?: number;
  borderWidth?: number;
};

const GradientBorderCard: React.FC<Props> = ({
  children,
  style,
  borderColors = [...AppTheme.colors.ctaButtonGradient],
  backgroundColor = AppTheme.colors.surface,
  borderRadius = AppTheme.layout.borderRadius * 2,
  borderWidth = 0.5,
}) => {
  const minPx = 1 / PixelRatio.get();
  const bw = Math.max(borderWidth, minPx);
  const innerRadius = Math.max(0, borderRadius - bw);

  return (
    <View style={[styles.wrapper, { borderRadius }, style]}>
      <LinearGradient
        colors={borderColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        style={[
          styles.inner,
          { margin: bw, borderRadius: innerRadius, backgroundColor },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    alignSelf: 'stretch',
  },
  inner: {
    flex: 1,
  },
});

export default GradientBorderCard;
