import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { GradientText } from '../common';
import { AppText } from '../ui/AppText';
import { hs, vs } from '../../theme/responsive';
import { TextVariantKey } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

export const StatItem: React.FC<{
  label: string;
  color?: string[];
  textVariant?: TextVariantKey;
  value?: string | number;
  style?: ViewStyle;
  active?: boolean;
}> = ({ label, value, style, color, textVariant = 'desc' }) => (
  <View style={[styles.wrap, style]}>
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginBottom: vs(6),
        flexDirection: 'row',
      }}
    >
      {!!color && (
        <LinearGradient
          colors={color as string[]}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: hs(10),
            height: vs(10),
            marginRight: hs(2),
          }}
        />
      )}
      <GradientText text={label} textVariant={textVariant} />
    </View>

    {!!value && (
      <AppText variant={'desc'} style={styles.value}>
        {value}
      </AppText>
    )}
  </View>
);

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', flex: 1 },
  value: { marginTop: vs(6) },
});
