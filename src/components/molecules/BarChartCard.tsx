import React from 'react';
import { View } from 'react-native';
import { StatItem } from '../atoms/StatItem';
import GradientBorderCard from './GradientBorderCard';
import { AppTheme } from '../../theme';
import { AppText } from '../ui/AppText';
import { GradientCTAButton } from '../atoms';
import { makeStyles } from '../../theme/responsive';
import BarChart from '../atoms/BarChart';

type FilterItem = { label: string; color: string[]; value: number };

type Props = {
  title: string;
  dataFilterValues: FilterItem[];
  total: string | number;
};

export const BarChartCard: React.FC<Props> = ({
  title,
  dataFilterValues,
  total = 0,
}) => {
  const styles = useStyles();

  const values = dataFilterValues.map(item => item.value);
  const maxValue = Math.max(...values);
  const maxWithBuffer = maxValue + 100;

  const stringValues = values.map(String);

  return (
    <View style={styles.card}>
      <GradientBorderCard borderRadius={0}>
        <AppText
          variant="small_head_desc"
          style={styles.title}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </AppText>

        <View style={styles.chartContainer}>
          {}
          <BarChart
            values={values}
            maxValue={maxWithBuffer}
            labels={stringValues}
          />
        </View>

        <View style={styles.row}>
          {dataFilterValues.map((it, i) => (
            <StatItem
              key={i}
              label={it.label}
              color={it.color}
              textVariant="small_head_desc1"
            />
          ))}
        </View>
        <GradientCTAButton
          style={styles.ctaButton}
          textStyle={styles.ctaTextStyle}
          title={`மொத்தம் : ${total?.toLocaleString('en-US')}`}
          disabled={false}
          textVariant="small_tamil_desc1"
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
    marginTop: AppTheme.layout.spacing.sm,
    minHeight: AppTheme.layout.spacing.lg,
    paddingHorizontal: AppTheme.layout.spacing.xs,
  },
  chartContainer: {
    marginTop: AppTheme.layout.spacing.sm,
    alignItems: 'center' as const,
  },
  row: {
    flexDirection: 'row' as const,
    marginTop: r.responsiveHeight(4),
    marginHorizontal: r.responsiveWidth(12),
  },
  ctaButton: {
    marginBottom: AppTheme.layout.spacing.xs - 2,
  },
  ctaTextStyle: {
    paddingHorizontal: AppTheme.layout.spacing.sm,
  },
  gradientStyle: {
    height: r.responsiveHeight(17),
  },
}));
