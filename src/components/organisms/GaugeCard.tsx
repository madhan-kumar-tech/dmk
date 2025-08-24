import React from 'react';
import { View } from 'react-native';
import { StatItem } from '../atoms/StatItem';
import GaugeMeter from '../atoms/GaugeMeter';
import GradientBorderCard from '../molecules/GradientBorderCard';
import { AppTheme } from '../../theme';
import { AppText } from '../ui/AppText';
import { GradientCTAButton } from '../atoms';
import { makeStyles } from '../../theme/responsive';

type FilterItem = { label: string; value: string | number };

type Props = {
  title?: string;
  dataFilterValues?: FilterItem[];
  total?: string | number;
};

export const GaugeCard: React.FC<Props> = ({
  title,
  total = 0,
  dataFilterValues = [],
}) => {
  const styles = useStyles();

  return (
    <View style={styles.card}>
      <GradientBorderCard borderRadius={0}>
        <AppText variant="h1" style={styles.title}>
          {title}
        </AppText>

        <View style={styles.gaugeContainer}>
          <GaugeMeter value={17500} />
        </View>

        <View style={styles.row}>
          {dataFilterValues.map((it, i) => (
            <StatItem key={i} label={it.label} value={it.value} textVariant='body'/>
          ))}
        </View>
        <GradientCTAButton
          style={styles.ctaButton}
          textStyle={styles.ctaTextStyle}
          title={`மொத்தம் : ${total?.toLocaleString('en-US')}`}
          disabled={false}
          gradientStyle={styles.gradientStyle}
        />
      </GradientBorderCard>
    </View>
  );
};

const useStyles = makeStyles(r => ({
  card: {
    marginTop: AppTheme.layout.spacing.lg - 4,
    backgroundColor: AppTheme.colors.surface,
  },
  title: {
    textAlign: 'center' as const,
    marginTop: AppTheme.layout.spacing.md,
  },
  gaugeContainer: {
    marginTop: AppTheme.layout.spacing.lg,
    alignItems: 'center' as const,
  },
  row: {
    flexDirection: 'row' as const,
    marginTop: r.responsiveHeight(40),
  },
  ctaButton: {
    marginTop: AppTheme.layout.spacing.lg - 2,
  },
  ctaTextStyle: {
    paddingHorizontal: AppTheme.layout.spacing.lg + 1,
  },
  gradientStyle: {
    height: r.responsiveHeight(35),
  },
}));
