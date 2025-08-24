import React from 'react';
import { View, TextInput, ViewStyle, TextStyle } from 'react-native';
import { makeStyles } from '../../theme/responsive';
import { AppText } from '../ui';

type Props = {
  label?: string;
  countryCode?: string;
  value: string;
  onChange: (v: string) => void;
  verifiedText?: string;
  placeholder?: string;
};

export const PhoneField: React.FC<Props> = ({
  label,
  countryCode = '+91',
  value,
  onChange,
  verifiedText,
  placeholder,
}) => {
  const s = useStyles();
  return (
    <View style={s.container}>
      {!!label && (
        <View style={s.labelRow}>
          <AppText variant="caption" style={s.label}>
            {label}
          </AppText>
          {!!verifiedText && (
            <AppText variant="caption" style={s.verified}>
              {verifiedText}
            </AppText>
          )}
        </View>
      )}
      <View style={s.row}>
        <View style={s.ccBox}>
          <AppText variant="body" style={s.ccText}>
            {countryCode}
          </AppText>
        </View>
        <TextInput
          keyboardType="phone-pad"
          style={s.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
        />
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: { marginBottom: 12 } as ViewStyle,
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  } as ViewStyle,
  label: { opacity: 0.9, flex: 1 } as TextStyle,
  verified: { color: '#1AAE55' } as TextStyle,
  row: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    overflow: 'hidden',
  } as ViewStyle,
  ccBox: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E1E4E8',
  } as ViewStyle,
  ccText: { fontWeight: '700' } as TextStyle,
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  } as TextStyle,
}));
