import React from 'react';
import { View, ViewStyle } from 'react-native';
import { AppText } from '../../components/ui';
import { GradientCTAButton } from '../../components/atoms';
import { makeStyles, hs, vs } from '../../theme/responsive';

type Props = {
  title?: string;
  message?: string;
  code?: string | number;
  onRetry?: () => void;
  retryLabel?: string;
};

export const ErrorState: React.FC<Props> = ({
  title = 'Error',
  message = 'Unable to complete the request.',
  code,
  onRetry,
  retryLabel = 'Retry',
}) => {
  const s = useStyles();
  return (
    <View style={s.wrap}>
      <View style={s.card}>
        <AppText variant="t_header" style={s.title}>
          {title}
        </AppText>
        <AppText variant="body" style={s.msg}>
          {message}
        </AppText>
        {!!code && (
          <AppText variant="caption" style={s.code}>
            Code: {String(code)}
          </AppText>
        )}
        {!!onRetry && (
          <View style={{ marginTop: vs(12) }}>
            <GradientCTAButton
              title={retryLabel}
              onPress={onRetry}
              gradientStyle={{
                width: '70%',
                height: 35,
                borderRadius: 8,
                alignSelf: 'center',
              }}
              block
            />
          </View>
        )}
      </View>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  wrap: {
    flex: 1,
    paddingHorizontal: hs(16),
    paddingVertical: vs(16),
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  card: {
    width: '100%',
    borderRadius: 16,
    padding: hs(16),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  } as ViewStyle,
  title: { marginBottom: vs(6) },
  msg: { opacity: 0.9 },
  code: { marginTop: vs(6), opacity: 0.6 },
}));
