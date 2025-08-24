import React from 'react';
import { View, ViewStyle } from 'react-native';
import { AppText } from '../../components/ui';
import { GradientCTAButton } from '../../components/atoms';
import { makeStyles, hs, vs } from '../../theme/responsive';

type Props = {
  title?: string;
  subtitle?: string;
  onRetry?: () => void;
  retryLabel?: string;
};

export const EmptyState: React.FC<Props> = ({
  title = 'Nothing here yet',
  subtitle = 'No matching records.',
  onRetry,
  retryLabel = 'மீண்டும் முயற்சிக்கவும்',
}) => {
  const s = useStyles();
  return (
    <View style={s.wrap}>
      <AppText variant="t_header" style={{ marginBottom: vs(6) }}>
        {title}
      </AppText>
      <AppText
        variant="body"
        style={{ opacity: 0.8, marginBottom: vs(12), textAlign: 'center' }}
      >
        {subtitle}
      </AppText>
      {!!onRetry && (
        <GradientCTAButton
          title={retryLabel || 'மீண்டும் முயற்சிக்கவும்'}
          onPress={onRetry}
          gradientStyle={{
            width: '70%',
            height: 35,
            borderRadius: 8,
            alignSelf: 'center',
          }}
          block
        />
      )}
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
}));
