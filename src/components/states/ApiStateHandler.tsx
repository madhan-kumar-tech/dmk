import React from 'react';
import { View, ViewStyle } from 'react-native';
import { makeStyles, hs, vs } from '../../theme/responsive';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import { BottomActions } from '../organisms';
import { AppHeader } from '../common';

export type NormalizedError = {
  message?: string;
  code?: string | number;

  isEmpty?: boolean;
};

export function normalizeApiError(err: any): NormalizedError | undefined {
  if (!err) return undefined;

  if (
    typeof err?.message === 'string' &&
    /Network request failed/i.test(err.message)
  ) {
    return {
      message: 'Network error. Please check your connection and retry.',
    };
  }

  const apiErr = err?.error ?? err;
  const msg = apiErr?.message ?? err?.message;
  const code = apiErr?.code ?? err?.code;

  const isEmpty = typeof msg === 'string' && /no matching records/i.test(msg);

  return { message: msg, code, isEmpty };
}

type Props = {
  error?: any;
  isEmpty?: boolean;
  onRetry?: () => void;
  emptyTitle?: string;
  emptySubtitle?: string;
  children: React.ReactNode;
};

export const ApiStateHandler: React.FC<Props> = ({
  error,
  isEmpty,
  onRetry,
  emptyTitle = 'No data',
  emptySubtitle = 'Try adjusting filters or pull to refresh.',
  children,
}) => {
  const s = useStyles();

  const norm = normalizeApiError(error);
  if (norm) {
    if (norm.isEmpty || isEmpty) {
      return (
        <View style={s.fill}>
          <AppHeader title="T.N.பாளையம் ஒன்றிய திமுக" />
          <EmptyState
            title={emptyTitle}
            subtitle={emptySubtitle}
            onRetry={onRetry}
          />
          <BottomActions />
        </View>
      );
    }

    return (
      <View style={s.fill}>
        <AppHeader title="T.N.பாளையம் ஒன்றிய திமுக" />
        <ErrorState
          title="Something went wrong"
          message={norm.message || 'Unable to load data. Please try again.'}
          code={norm.code}
          onRetry={onRetry}
        />
        <BottomActions />
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={s.fill}>
        <AppHeader title="T.N.பாளையம் ஒன்றிய திமுக" />
        <EmptyState
          title={emptyTitle}
          subtitle={emptySubtitle}
          onRetry={onRetry}
        />
        <BottomActions />
      </View>
    );
  }

  return <>{children}</>;
};

const useStyles = makeStyles(() => ({
  fill: { flex: 1 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: hs(16),
    paddingVertical: vs(16),
  } as ViewStyle,
}));
