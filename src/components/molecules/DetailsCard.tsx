import React from 'react';
import { View, ViewStyle } from 'react-native';
import { makeStyles } from '../../theme/responsive';
import { DetailRow } from '../atoms/DetailRow';

export type DetailsCardProps = {
  details: Array<{ label: string; value?: string | number }>;
  labelWidth?: number;
  containerStyle?: ViewStyle;
  rowStyle?: ViewStyle;

  renderRow?: (
    row: { label: string; value?: string | number },
    index: number,
  ) => React.ReactNode;
};

export const DetailsCard: React.FC<DetailsCardProps> = ({
  details,
  labelWidth = 120,
  containerStyle,
  rowStyle,
  renderRow,
}) => {
  const s = useStyles();

  return (
    <View style={[s.card, containerStyle]}>
      {details.map((f, i) =>
        renderRow ? (
          <React.Fragment key={`${f.label}:${i}`}>
            {renderRow(f, i)}
          </React.Fragment>
        ) : (
          <DetailRow
            key={`${f.label}:${i}`}
            label={f.label}
            value={f.value}
            labelWidth={labelWidth}
            style={rowStyle}
          />
        ),
      )}
    </View>
  );
};

const useStyles = makeStyles(r => ({
  card: {
    marginTop: r.responsiveHeight(24),
    paddingHorizontal: r.responsiveWidth(16),
  } as ViewStyle,
}));
