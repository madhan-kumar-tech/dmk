import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppTheme } from '../../theme';
import { IMAGES } from '../../assets';
import { GradientText } from './GradientText';
import { makeStyles, ms } from '../../theme/responsive';

type Props = {
  title: string;
  logoSource?: any;
  style?: ViewStyle;
};

export const AppHeader: React.FC<Props> = ({
  title,
  logoSource = IMAGES.headerLogo,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top }, style]}>
      <View style={styles.row}>
        <Image source={logoSource} style={styles.logo} resizeMode="contain" />

        <GradientText text={title} style={styles.title} />
      </View>

      {}
      <View style={styles.divider} />
    </View>
  );
};

const useStyles = makeStyles(r => ({
  wrap: {
    backgroundColor: AppTheme.colors.surface,

    ...AppTheme.shadows.small,
  },
  row: {
    height: r.responsiveHeight(56),
    paddingHorizontal: AppTheme.layout.spacing.md,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  logo: {
    width: r.responsiveSize(36),
    height: r.responsiveSize(36),
    marginRight: AppTheme.layout.spacing.sm + 2,
    borderRadius: ms(4),
  },
  title: {
    flexShrink: 1,
    ...AppTheme.textVariants.h2,
    color: AppTheme.colors.accent,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: AppTheme.colors.background.secondary,
  },
}));
