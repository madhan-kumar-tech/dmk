import React from 'react';
import { View, TextInput } from 'react-native';
import { AppText } from '../ui';
import { makeStyles, vs } from '../../theme/responsive';
import type { PickedImage } from '../../types/home';
import { InlineButton } from '../atoms/InlineButton';
import { PhoneVerifiedBadge } from '../atoms/PhoneVerifiedBadge';
import { AttachmentGrid } from '../molecules/AttachmentGrid';
import { OTPInput } from '../atoms';
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
          <View>
            <TextInput
              style={s.input}
              keyboardType="phone-pad"
              value={values.phone}
              onChangeText={t => onChange({ phone: t })}
              placeholder="தொலைபேசி எண்"
              maxLength={10}
            />
            <InnerShadow />
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
              <TextInput
                style={[s.input, s.multiline]}
                value={values.details}
                onChangeText={t => onChange({ details: t })}
                placeholder="சுருக்கமாக எழுதவும்…"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
              <InnerShadow />
            </View>
          </View>

          <AttachmentGrid
            images={images}
            onPick={onPickImages}
            onRemove={onRemoveImage}
            error={fileError}
          />
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
  card: {},
  field: { marginBottom: vs(12) },
  input: {
    borderWidth: 1,
    borderColor: '#E0E4EA',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  multiline: { height: 140 },
}));
