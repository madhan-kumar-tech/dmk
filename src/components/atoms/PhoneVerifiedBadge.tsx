import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { AppText } from '../ui';
import { makeStyles, hs, vs } from '../../theme/responsive';

type Props = { text?: string };

export const PhoneVerifiedBadge: React.FC<Props> = ({
  text = 'சரிபார்க்கப்பட்டது',
}) => {
  const s = useStyles();
  return (
    <View style={s.badge}>
      <AppText variant="t_caption" style={s.badgeText}>
        ✓ {text}
      </AppText>
    </View>
  );
};

const useStyles = makeStyles(() => ({
  badge: {
    paddingHorizontal: hs(8),
    paddingVertical: vs(4),
    borderRadius: 999,
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-start',
  } as ViewStyle,
  badgeText: { color: '#1B5E20', fontWeight: '700' } as TextStyle,
}));
