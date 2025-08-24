import React, { useMemo, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Platform,
} from 'react-native';
import { makeStyles } from '../../theme/responsive';
import { AppText } from '../ui';
import { AppTheme } from '../../theme';
import { InnerShadow } from '../../../ui/atoms/InnerShadow';

type Props = {
  length?: number;
  value: string;
  onChange: (val: string) => void;
  onResend?: () => void;
  helperText?: string;
  disabled?: boolean;
  resendDisabled?: boolean;
};

export const OTPInput: React.FC<Props> = ({
  length = 4,
  value,
  onChange,
  onResend,
  helperText,
  disabled = false,
  resendDisabled = false,
}) => {
  const s = useStyles();
  const refs = useRef<Array<TextInput | null>>([]);

  const chars = useMemo(() => {
    const v = (value ?? '').slice(0, length);
    return Array.from({ length }, (_, i) => v[i] ?? '');
  }, [value, length]);

  const focusPrev = (index: number) => {
    if (index > 0) refs.current[index - 1]?.focus();
  };
  const focusNext = (index: number) => {
    if (index < length - 1) refs.current[index + 1]?.focus();
  };

  const setChar = (index: number, ch: string) => {
    const safe = ch.replace(/[^0-9]/g, '').slice(0, 1);
    const next = [...chars];
    next[index] = safe;
    onChange(next.join(''));
    if (safe) focusNext(index);
  };

  const onKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !chars[index]) {
      focusPrev(index);
      const prev = [...chars];
      prev[index - 1] = '';
      onChange(prev.join(''));
    }
  };

  const onBoxChange = (index: number, text: string) => {
    const onlyDigits = text.replace(/[^0-9]/g, '');
    if (onlyDigits.length === 0) {
      if (chars[index]) {
        const next = [...chars];
        next[index] = '';
        onChange(next.join(''));
      }
      focusPrev(index);
      return;
    }
    if (onlyDigits.length === 1) {
      setChar(index, onlyDigits);
      return;
    }

    const next = [...chars];
    for (let i = 0; i < onlyDigits.length && index + i < length; i++)
      next[index + i] = onlyDigits[i];
    onChange(next.join(''));
    const last = Math.min(index + onlyDigits.length - 1, length - 1);
    refs.current[last]?.focus();
  };

  return (
    <View style={s.wrap}>
      <AppText variant="caption" style={{ marginBottom: 8 }}>
        OTP ஐ உள்ளிடவும்
      </AppText>

      <View style={s.row}>
        {chars.map((c, i) => (
          <View key={i}>
            <TextInput
              // @ts-expect-error react-native types
              ref={r => (refs.current[i] = r)}
              style={[s.box, disabled && s.boxDisabled]}
              keyboardType="number-pad"
              returnKeyType="next"
              maxLength={1}
              value={c}
              onChangeText={t => onBoxChange(i, t)}
              onKeyPress={e => onKeyPress(i, e)}
              editable={!disabled}
            />
            <InnerShadow />
          </View>
        ))}
      </View>

      <View style={s.footer}>
        <AppText variant="t_body" style={s.helpText}>
          {helperText ?? 'OTP கிடைக்கவில்லையா?'}
        </AppText>
        {!!onResend && (
          <TouchableOpacity
            onPress={onResend}
            disabled={disabled || resendDisabled}
          >
            <AppText
              variant="t_body"
              style={[
                s.resend,
                (disabled || resendDisabled) && s.resendDisabled,
              ]}
            >
              மீண்டும் அனுப்பு
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const BOX = 58;
const useStyles = makeStyles(
  r =>
    ({
      wrap: { marginBottom: 8 },
      row: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginTop: 6,
        marginBottom: 8,
        columnGap: 16, // Reduce gap between OTP boxes
      },
      box: {
        width: r.responsiveWidth(BOX),
        height: r.responsiveHeight(BOX),
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlign: 'center' as const,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#E7EAF0',
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
          },
          android: { elevation: 3 },
        }),
      },
      boxDisabled: { backgroundColor: '#F3F4F6' },
      footer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      },
      helpText: { color: AppTheme?.colors?.text?.secondary ?? '#667085' },
      resend: {
        color: '#15803D',
        fontWeight: '700',
      },
      resendDisabled: { color: '#94A3B8', textDecorationLine: 'none' },
    } as any),
);
