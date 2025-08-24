import React from 'react';
import { View, ViewStyle } from 'react-native';
import { makeStyles } from '../../theme/responsive';
import { BarChartCard } from '../molecules/BarChartCard';

type FilterItem = { label: string; color: string[]; value: number };

type BarChartItem = {
  title: string;
  dataFilterValues: FilterItem[];
  total: string | number;
};

export const BarChartMain: React.FC<{ barChartData: BarChartItem[] }> = ({
  barChartData,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.wrap}>
      {barChartData.map((item, index) => (
        <View style={styles.gridItem} key={index}>
          <BarChartCard
            title={item.title}
            dataFilterValues={item.dataFilterValues}
            total={item.total}
          />
        </View>
      ))}
    </View>
  );
};
const useStyles = makeStyles(() => ({
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  } satisfies ViewStyle,
  gridItem: {
    width: '48%',
  } satisfies ViewStyle,
}));
