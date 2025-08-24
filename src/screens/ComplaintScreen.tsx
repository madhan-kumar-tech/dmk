import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeStyles } from '../theme/responsive';
import { AppText } from '../components/ui';
import { BottomActions } from '../components/organisms/BottomActions';
import { FormSectionCard } from '../components/organisms/FormSectionCard';
import { SelectField } from '../components/molecules/SelectField';

import {
  ComplaintForm,
  type ComplaintFormValues,
} from '../components/organisms/ComplaintForm';
import { useHomeApi } from '../hooks/useHomeApi';
import { useGeneralApi } from '../hooks/useGeneralApi';
import { apiFetch } from '../services/client';

import type { SimpleOpt, PickedImage } from '../types/home';
import {
  extractRootOptsForComplaint,
  mapDropdown,
  isValidINPhone,
  isAllowedType,
  sumSizes,
  MAX_COMBINED_BYTES,
} from '../features/complaint/utils';
import { pickMultipleImages } from '../services/imagePicker';
import { readFileAsBase64, extFromMime } from '../services/base64';
import { GradientCTAButton } from '../components/atoms';
import { useDMKNavigation } from '../hooks';
import { SCREEN_NAMES } from '../constants';
import { useResendTimer } from '../hooks/useResendTimer';
import { AppTheme } from '../theme';

export const ComplaintScreen: React.FC = () => {
  const s = useStyles();

  const { data } = useHomeApi();
  const options = useMemo(() => data?.options ?? [], [data]);
  const rootOptions = useMemo(
    () => extractRootOptsForComplaint({ options }),
    [options],
  );

  const [dd1, setDD1] = useState<SimpleOpt | undefined>();
  const [dd2, setDD2] = useState<SimpleOpt | undefined>();
  const [dd3, setDD3] = useState<SimpleOpt | undefined>();
  const [dd4, setDD4] = useState<SimpleOpt | undefined>();

  const resetFrom = (level: 1 | 2 | 3) => {
    if (level <= 1) {
      setDD2(undefined);
      setDD3(undefined);
      setDD4(undefined);
    } else if (level === 2) {
      setDD3(undefined);
      setDD4(undefined);
    } else {
      setDD4(undefined);
    }

    setPending(null);
    setComplaintId(null);
  };

  const dd2Descriptor = useMemo(() => dd1?.api, [dd1]);
  const dd3Descriptor = useMemo(() => dd2?.api, [dd2]);
  const dd4Descriptor = useMemo(() => dd3?.api, [dd3]);

  const dd2Query = useGeneralApi<any>(dd2Descriptor as any, {
    enabled: !!dd2Descriptor,
  });
  const dd3Query = useGeneralApi<any>(dd3Descriptor as any, {
    enabled: !!dd3Descriptor,
  });
  const dd4Query = useGeneralApi<any>(dd4Descriptor as any, {
    enabled: !!dd4Descriptor,
  });

  const { title: dd2Title, options: dd2Options } = mapDropdown(dd2Query.data);
  const { title: dd3Title, options: dd3Options } = mapDropdown(dd3Query.data);
  const { title: dd4Title, options: dd4Options } = mapDropdown(dd4Query.data);

  const [values, setValues] = useState<ComplaintFormValues>({
    phone: '',
    otp: '',
    details: '',
  });
  const patch = (p: Partial<ComplaintFormValues>) =>
    setValues(v => ({ ...v, ...p }));

  const { canResend, start: startResend } = useResendTimer(30);

  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);
  const [pending, setPending] = useState<{ id: string; phone: string } | null>(
    null,
  );
  const [complaintId, setComplaintId] = useState<string | null>(null);

  const [images, setImages] = useState<PickedImage[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const navigation = useDMKNavigation();

  const validateImages = (files: PickedImage[]): string | null => {
    for (const f of files)
      if (!isAllowedType(f.type))
        return 'JPG/JPEG/PNG கோப்புகள் மட்டுமே அனுமதிக்கப்படும்.';
    const total = sumSizes(files);

    if (total > MAX_COMBINED_BYTES)
      return 'அனைத்து படங்களின் மொத்த அளவு 5MB-ஐ மீறக்கூடாது.';
    return null;
  };

  const onPickImages = async () => {
    const picked = await pickMultipleImages();

    if (!picked) return;
    const merged = [...images, ...picked];
    const err = validateImages(merged);
    if (err) {
      setFileError(err);
      return;
    }
    setFileError(null);
    setImages(merged);
  };
  const onRemoveImage = (index: number) => {
    const next = images.filter((_, i) => i !== index);
    const err = validateImages(next);
    setImages(next);
    setFileError(err);
  };

  const selectionsReady = !!(dd1 && dd2 && dd3 && dd4);
  const isPhoneValid = isValidINPhone(values.phone);
  const isPhoneVerified = !!verifiedPhone && values.phone === verifiedPhone;
  const otpActive =
    !!pending && pending.phone === values.phone && !isPhoneVerified;

  const showPhone = selectionsReady;
  const showOtp = otpActive;
  const showForm = selectionsReady && isPhoneVerified && !!complaintId;

  const currentSelectionPayload = () => ({
    niravagiId: dd1?.value,
    panchayat: dd2?.value,
    kilaiWard: dd3?.value,
    wardBoothId: dd4?.value,
    phoneNumber: values.phone,
  });

  const extractInsertId = (res: any): string | null => {
    const idA =
      res?.response?.id ?? (res?.response?.success && res?.response?.id);
    if (idA != null) return String(idA);

    if (res?.status && res?.id != null) return String(res.id);
    return null;
  };

  const createOrFetchId = async (opts?: { silentIfVerified?: boolean }) => {
    const res = await apiFetch<any>({
      method: 'POST',
      url: 'api/complaintInsert.php',
      payload: currentSelectionPayload(),
    });
    const id = extractInsertId(res);
    if (!id) return null;

    setComplaintId(id);

    if (isPhoneVerified && opts?.silentIfVerified) {
      setPending(null);
    } else {
      setPending({ id, phone: values.phone });
    }
    return id;
  };

  const verifyOtp = async () => {
    if (!pending || values.otp.trim().length !== 4) return false;
    const res = await apiFetch<{ statusCode: number }>({
      method: 'POST',
      url: 'api/otpVerify.php',
      payload: { id: pending.id, otp: values.otp.trim() },
    });

    if (res?.status) {
      setVerifiedPhone(values.phone);
      setPending(null);
      patch({ otp: '' });
      return true;
    }
    return false;
  };

  const handleResendOtp = async () => {
    if (!pending) return;
    const res = await apiFetch<any>({
      method: 'POST',
      url: 'api/otpSend.php',
      payload: {
        id: pending.id,
      },
    });
    if (res?.status) {
      setVerifiedPhone(values.phone);
      setPending(null);
      patch({ otp: '' });
      return true;
    }
    startResend();
  };

  const submitComplaint = async () => {
    if (!complaintId || !values.details?.trim() || fileError) return;

    const uploads: Array<{
      fileName: string;
      imageType: 'jpg' | 'png';
      imageData: string;
    }> = [];
    let base64TotalBytes = 0;
    for (const img of images) {
      const base64 = await readFileAsBase64(img.uri);
      const approxBytes = Math.floor((base64.length * 3) / 4);
      base64TotalBytes += approxBytes;
      uploads.push({
        fileName: img.name,
        imageType: extFromMime(img.type) as 'jpg' | 'png',
        imageData: base64,
      });
    }
    if (base64TotalBytes > MAX_COMBINED_BYTES) {
      setFileError('அனைத்து படங்களின் மொத்த அளவு 5MB-ஐ மீறக்கூடாது.');
      return;
    }

    const res = await apiFetch<{ statusCode: number }>({
      method: 'POST',
      url: 'api/complaintRegister.php',
      payload: {
        id: complaintId,
        complaint: values.details,
        uploads,
      },
    });

    if (res?.status) {
      setComplaintId(null);
      setImages([]);
      setFileError(null);
      setValues({ phone: values.phone, otp: '', details: '' });

      setSuccess(true);
      (navigation as any).replace(SCREEN_NAMES.SUCCESS_SCREEN, {
        title: 'உங்கள் புகார் வெற்றிகரமாக\nசமர்ப்பிக்கப்பட்டது',
      });
    }
  };

  const [success, setSuccess] = useState(false);

  const handleFormChange = (p: Partial<ComplaintFormValues>) => {
    if (Object.prototype.hasOwnProperty.call(p, 'phone')) {
      const nextPhone = String(p.phone ?? '');
      setValues(v => ({ ...v, phone: nextPhone }));

      if (verifiedPhone && nextPhone === verifiedPhone) {
        setPending(null);
      } else {
        setPending(null);
        setComplaintId(null);
      }

      patch({ otp: '' });
      return;
    }
    setValues(v => ({ ...v, ...p }));
  };

  const onPrimary = async () => {
    if (!selectionsReady) return;

    if (!isPhoneVerified && !otpActive) {
      if (!isPhoneValid) return;
      await createOrFetchId();
      return;
    }

    if (otpActive) {
      const ok = await verifyOtp();
      if (!ok) return;

      if (!complaintId) await createOrFetchId({ silentIfVerified: true });
      return;
    }

    if (isPhoneVerified && !complaintId) {
      await createOrFetchId({ silentIfVerified: true });
      return;
    }

    if (showForm) {
      await submitComplaint();
    }
  };

  const ctaLabel = !selectionsReady
    ? 'தொடரவும்'
    : otpActive
    ? 'சமர்ப்பிக்கவும்'
    : isPhoneVerified && complaintId
    ? 'முடிக்கவும்'
    : 'தொடரவும்';

  const ctaDisabled =
    !selectionsReady ||
    (!isPhoneVerified && !otpActive && !isPhoneValid) ||
    (otpActive && values.otp.trim().length !== 4) ||
    (isPhoneVerified &&
      complaintId &&
      (!values.details?.trim() || !!fileError));

  const showSuccess = success;

  return (
    <SafeAreaView style={s.root} edges={['left', 'right', 'bottom']}>
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <AppText variant="t_header" style={{ marginBottom: 12 }}>
          புகார்கள்
        </AppText>

        {}
        <FormSectionCard>
          <SelectField
            label="உங்கள் பேருராட்சி/ஊராட்சி"
            value={dd1?.value}
            onChange={(_, opt) => {
              setDD1(opt as SimpleOpt);
              resetFrom(1);
            }}
            leftIcon="home-city-outline"
            options={rootOptions}
            placeholder="பேரூராட்சி / ஊராட்சி தேர்ந்தெடுக்கவும்."
          />
          <SelectField
            label={`உங்கள் ${dd2Title ?? dd1?.label ?? 'பேருராட்சி/ஊராட்சி'}`}
            value={dd2?.value}
            onChange={(_, opt) => {
              setDD2(opt as SimpleOpt);
              resetFrom(2);
            }}
            options={dd2Options}
            placeholder="தேர்ந்தெடுக்கவும்."
            leftIcon="home-city-outline"
            disabled={!dd1}
            loading={dd2Query.isLoading}
          />
          <SelectField
            label={`உங்கள் ${dd3Title ?? 'கிளை/வார்டு'}`}
            value={dd3?.value}
            onChange={(_, opt) => {
              setDD3(opt as SimpleOpt);
              resetFrom(3);
            }}
            options={dd3Options}
            leftIcon="map-marker-radius-outline"
            placeholder="தேர்ந்தெடுக்கவும்."
            disabled={!dd2}
            loading={dd3Query.isLoading}
          />
          <SelectField
            label={`உங்கள் ${dd4Title ?? 'கிளை / பூத் / வார்டு'}`}
            value={dd4?.value}
            onChange={(_, opt) => {
              setDD4(opt as SimpleOpt);
            }}
            options={dd4Options}
            placeholder="தேர்ந்தெடுக்கவும்."
            leftIcon="vote"
            disabled={!dd3}
            loading={dd4Query.isLoading}
            dropdownZIndex={20}
          />
        </FormSectionCard>

        {}
        {!showSuccess && selectionsReady && (
          <ComplaintForm
            values={values}
            onChange={handleFormChange}
            showPhone={showPhone}
            showOtp={showOtp}
            showForm={showForm}
            isPhoneVerified={isPhoneVerified}
            otpResendDisabled={!canResend}
            images={images}
            onPickImages={onPickImages}
            onRemoveImage={onRemoveImage}
            fileError={fileError}
            ctaLabel={ctaLabel}
            ctaDisabled={ctaDisabled as boolean}
            onPressCta={onPrimary}
            onResendOtp={handleResendOtp}
          />
        )}
      </ScrollView>

      <BottomActions />
    </SafeAreaView>
  );
};

const useStyles = makeStyles(r => ({
  root: { flex: 1, backgroundColor: AppTheme.colors.background.light },
  scroll: {
    paddingHorizontal: r.responsiveWidth(16),
    paddingTop: 12,
    paddingBottom: 24,
  },
}));
