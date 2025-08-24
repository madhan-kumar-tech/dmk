import React from 'react';
import { Platform, View, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles, vs } from '../../theme/responsive';
import { Avatar } from '../atoms/Avatar';
import { AppText } from '../ui';
import { GradientText } from '../common';

export type CenterHeaderProps = {
  avatar?: string;
  name: string;
  role?: string;
  subInfo?: string;
};

export const CenterHeader: React.FC<CenterHeaderProps> = ({
  avatar,
  name,
  role,
  subInfo,
}) => {
  const s = useStyles();
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.center, { paddingTop: insets.top ? 0 : vs(8) }]}>
      <Avatar uri={avatar} size={92} />

      <AppText
        variant="t_header"
        style={
          {
            paddingTop: vs(24),
            marginBottom: vs(8),
            ...(Platform.OS === 'android'
              ? { includeFontPadding: false }
              : null),
          } as TextStyle
        }
      >
        {name}
      </AppText>

      {!!role && (
        <GradientText
          style={{ marginBottom: vs(12) }}
          textVariant="t_header_1"
          text={role}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
        />
      )}

      {!!subInfo && (
        <AppText variant="t_body" style={s.subInfo}>
          {subInfo}
        </AppText>
      )}
    </View>
  );
};

const useStyles = makeStyles(() => ({
  center: { alignItems: 'center' } as ViewStyle,
  subInfo: { color: '#717070' } as TextStyle,
}));
