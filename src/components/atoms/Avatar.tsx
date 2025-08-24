import React from 'react';
import { Image, View, ViewStyle } from 'react-native';
import { makeStyles } from '../../theme/responsive';
import { IMAGES } from '../../assets';

type Props = { uri?: string; size?: number; ring?: boolean };
export const Avatar: React.FC<Props> = ({ uri, size = 56, ring = true }) => {
  const s = useStyles();
  return (
    <View
      style={[
        s.outer,
        ring && s.ring,
        { width: size + 8, height: size + 8, borderRadius: (size + 8) / 2 },
      ]}
    >
      <Image
        source={uri ? { uri } : IMAGES.headerLogo}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
};
const useStyles = makeStyles(() => ({
  outer: { alignItems: 'center', justifyContent: 'center' } satisfies ViewStyle,
  ring: { borderWidth: 2, borderColor: '#d11a1a', borderRadius: 999 },
}));
