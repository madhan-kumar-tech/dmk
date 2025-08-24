import React from 'react';
import { TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import { Avatar } from '../atoms/Avatar';
import { Card } from './Card';
import { makeStyles } from '../../theme/responsive';
import { AppText } from '../ui';

type Props = {
  name: string;
  phoneNumber?: string;
  avatar?: string;
  onPress?: () => void;
};
export const PersonListItem: React.FC<Props> = ({
  name,
  phoneNumber,
  avatar,
  onPress,
}) => {
  const s = useStyles();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card style={s.card}>
        <Avatar uri={avatar} />
        <View style={s.meta}>
          <AppText variant="t_body_semibold" style={s.name}>
            {name}
          </AppText>
          {!!phoneNumber && (
            <AppText variant="caption" style={s.sub}>
              {phoneNumber}
            </AppText>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
const useStyles = makeStyles(() => ({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  } satisfies ViewStyle,
  meta: { marginLeft: 12, flex: 1 } satisfies ViewStyle,
  name: { fontSize: 16, fontWeight: '700', color: '#111' } satisfies TextStyle,
  sub: { fontSize: 12, color: '#666', marginTop: 2 } satisfies TextStyle,
}));
