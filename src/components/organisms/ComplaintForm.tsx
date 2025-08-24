import React from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import { AppText } from '../ui';
import { makeStyles, vs } from '../../theme/responsive';
import type { PickedImage } from '../../types/home';
import { InlineButton } from '../atoms/InlineButton';
import { PhoneVerifiedBadge } from '../atoms/PhoneVerifiedBadge';
import { AttachmentGrid } from '../molecules/AttachmentGrid';
import { OTPInput, StyledTextInput } from '../atoms';
import { InnerShadow } from '../../../ui/atoms/InnerShadow';

export type ComplaintFormValues = {
  phone: string;
  otp: string;
  details: string;
};

type Props = {
  values: ComplaintFormValues;
  onChange: (patch: Partial<ComplaintFormValues>) => void;

  showPhone: boolean;
  showOtp: boolean;
  showForm: boolean;

  isPhoneVerified: boolean;
  otpResendDisabled?: boolean;

  images: PickedImage[];
  onPickImages: () => void;
  onRemoveImage: (index: number) => void;
  fileError?: string | null;

  ctaLabel: string;
  ctaDisabled: boolean;
  onPressCta: () => void;

  onResendOtp?: () => void;
};

export const ComplaintForm: React.FC<Props> = ({
  values,
  onChange,
  showPhone,
  showOtp,
  showForm,
  isPhoneVerified,
  otpResendDisabled,
  images,
  onPickImages,
  onRemoveImage,
  fileError,
  ctaLabel,
  ctaDisabled,
  onPressCta,
  onResendOtp,
}) => {
  const s = useStyles();

  return (
    <View style={s.card}>
      {showPhone && (
        <View style={s.field}>
          <AppText variant="caption" style={s.fieldTitle}>
            உங்கள் தொலைபேசி எண்
          </AppText>
          <View style={s.phoneWrapper}>
            {/* Inner shadow as the background */}
            <InnerShadow
              radius={12}
              opacity={0.09}
              thickness={6}
              style={{ borderRadius: 12 }}
            />

            {/* Foreground container absolutely positioned */}
            <View style={s.phoneField}>
              <View style={s.phoneFieldInner}>
                <AppText
                  style={{ fontWeight: '700', fontSize: 20, color: '#222' }}
                >
                  +91
                </AppText>
              </View>
              <StyledTextInput
                style={s.textInput}
                keyboardType="number-pad"
                value={values.phone}
                onChangeText={t =>
                  onChange({ phone: t.replace(/[^0-9]/g, '') })
                }
                placeholder="தொலைபேசி எண்"
                maxLength={10}
                placeholderTextColor="#9AA0A6"
              />
            </View>
          </View>

          {isPhoneVerified && (
            <View style={{ marginTop: 6 }}>
              <PhoneVerifiedBadge />
            </View>
          )}
        </View>
      )}

      {showOtp && (
        <View style={s.field}>
          <OTPInput
            length={4}
            value={values.otp}
            onChange={t => onChange({ otp: t })}
            onResend={onResendOtp}
            resendDisabled={otpResendDisabled}
          />
        </View>
      )}

      {showForm && (
        <>
          <View style={s.field}>
            <AppText variant="caption" style={s.fieldTitle}>
              உங்கள் புகார்
            </AppText>
            <View>
              <StyledTextInput
                style={[s.input, s.multiline]}
                value={values.details}
                onChangeText={t => onChange({ details: t })}
                placeholder="சுருக்கமாக எழுதவும்…"
                placeholderTextColor={'#9AA0A6'}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
              <InnerShadow opacity={0.09} />
            </View>
          </View>

          <View style={s.field}>
            <AttachmentGrid
              images={images}
              onPick={onPickImages}
              onRemove={onRemoveImage}
              error={fileError}
            />
          </View>
        </>
      )}

      {}
      {(showPhone || showOtp || showForm) && (
        <View style={{ alignItems: 'flex-end', marginTop: 10 }}>
          <InlineButton
            title={ctaLabel}
            onPress={onPressCta}
            disabled={ctaDisabled}
          />
        </View>
      )}
    </View>
  );
};

const useStyles = makeStyles(() => ({
  fieldTitle: {
    opacity: 0.9,
    marginBottom: 6,
    fontSize: 16,
  },
  card: { marginTop: 12 },
  field: { marginBottom: vs(12) },
  input: {
    borderWidth: 1,
    borderColor: '#E0E4EA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    // Ensure no underline on Android
    textDecorationLine: 'none' as const,
  },
  multiline: {
    height: 140,
    textAlignVertical: 'top' as const, // Important for Android multiline inputs
  },
  phoneWrapper: {
    position: 'relative' as const,
    height: 48,
    borderRadius: 12,
    marginBottom: 12,
  },
  phoneShadow: {
    borderRadius: 12,
  },
  phoneContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderRadius: 12,
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: '#E1E4E8',
    height: 48,
    backgroundColor: '#fff',
  },
  phoneCode: {
    width: 64,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRightWidth: 1,
    borderRightColor: '#E1E4E8',
    backgroundColor: '#fff',
    height: 48,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  phoneCodeText: {
    fontWeight: '700' as const,
    fontSize: 20,
    color: '#222',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: 48,
    backgroundColor: '#fff',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  phoneField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E1E4E8',
    height: 48,
    backgroundColor: 'transparent', // transparent so shadow is visible
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as ViewStyle,
  phoneFieldInner: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E1E4E8',
    backgroundColor: 'transparent',
    height: 48,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  } as ViewStyle,
  textInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 0,
    height: 48,
    backgroundColor: 'transparent',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    textDecorationLine: 'none',
  } as TextStyle,
}));
