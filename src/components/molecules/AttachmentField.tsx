import React from 'react';
import { Pressable, View, ViewStyle, TextStyle } from 'react-native';
import { makeStyles } from '../../theme/responsive';
import { AppText } from '../ui';

type Props = {
  label?: string;
  fileName?: string;
  onPick?: () => void;
  helper?: string;
};

export const AttachmentField: React.FC<Props> = ({
  label,
  fileName,
  onPick,
  helper = 'JPG, PNG, PDF (உச்சம் 5MB)',
}) => {
  const s = useStyles();
  return (
    <View style={s.container}>
      {!!label && (
        <AppText variant="caption" style={s.label}>
          {label}
        </AppText>
      )}

      <Pressable onPress={onPick} style={s.box}>
        <View style={s.iconDot} />
        <AppText variant="body" style={s.pickText}>
          {fileName ? fileName : 'புகைப்படம் / ஆவணம் பதிவேற்றம்'}
        </AppText>
      </Pressable>

      <AppText variant="caption" style={s.helper}>
        {helper}
      </AppText>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  container: { marginBottom: 12 } as ViewStyle,
  label: { opacity: 0.9, marginBottom: 6 } as TextStyle,
  box: {
    minHeight: 64,
    borderRadius: 12,
    backgroundColor: '#F7F7F8',
    borderWidth: 1,
    borderColor: '#E3E5E8',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  iconDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E1E4E8',
    marginBottom: 6,
  } as ViewStyle,
  pickText: { color: '#6B7280' } as TextStyle,
  helper: { color: '#9AA1A7', marginTop: 6 } as TextStyle,
}));
