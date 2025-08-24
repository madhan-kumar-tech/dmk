import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { makeStyles, hs } from '../../theme/responsive';
import { AppText } from '../ui';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
};

export const InlineButton: React.FC<Props> = ({
  title,
  onPress,
  disabled,
  style,
}) => {
  const s = useStyles();
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled}
      style={[s.btn, disabled ? s.btnDisabled : null, style]}
    >
      <AppText variant="t_body" style={s.btnText}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const BTN_H = 44;

const useStyles = makeStyles(() => ({
  btn: {
    height: BTN_H,
    paddingHorizontal: hs(16),
    borderRadius: 10,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: {
    backgroundColor: '#C7D2FE',
  },
  btnText: {
    color: '#fff',
  },
}));
