import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { makeStyles } from '../../theme/responsive';
import { AppText } from '../ui';

export type DetailRowProps = {
  label: string;
  value?: string | number;
  labelWidth?: number;
  style?: ViewStyle;
};

export const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  labelWidth = 120,
  style,
}) => {
  const s = useStyles();
  return (
    <View style={[s.row, style]}>
      
      <AppText
        variant="t_header_medium"
        style={[s.label, { width: labelWidth }]}
      >
        {label}
      </AppText>

      <AppText variant="t_header_medium" style={s.sep}>
        :
      </AppText>

      <View style={s.valueCol}>
        <AppText
          variant="t_body"
          style={s.value}
          lineBreakStrategyIOS="hangul-word"
          textBreakStrategy="highQuality"
        >
          {value ?? '-'}
        </AppText>
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  } satisfies ViewStyle,

  label: {} as ViewStyle,

  sep: {
    textAlign: 'center',
    marginTop: 1,
  } satisfies TextStyle,

  valueCol: {
    flex: 1,
    minWidth: 0,
  } as ViewStyle,

  value: {
    flexShrink: 1,
    marginLeft: 15,
  } as TextStyle,
}));
