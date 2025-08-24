import React from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { makeStyles } from '../../theme/responsive';
import { IMAGES } from '../../assets';
import { AppText } from '../ui/AppText';
import { AppTheme } from '../../theme';

type Props = {
  title: string;
  onPress?: () => void;
};

export const ComplainCard: React.FC<Props> = ({ title, onPress }) => {
  const s = useStyles();

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={s.card}>
      <ImageBackground
        source={IMAGES.complaintBg}
        style={s.bg}
        imageStyle={s.bgImage}
      >
        <View style={s.titleWrap}>
          <AppText numberOfLines={1} style={s.title} variant="t_caption">
            {title}
          </AppText>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles(() => {
  const radius = 18;
  return {
    card: {
      width: '100%',
      borderRadius: radius,
      overflow: 'hidden',
      backgroundColor: '#000',
    },
    bg: {
      height: 100,
      width: '100%',
      justifyContent: 'center',
    },
    bgImage: {
      borderRadius: radius,
      resizeMode: 'cover',
    },
    titleWrap: {
      position: 'absolute',
      right: 20,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    title: {
      color: AppTheme.colors.primary,
    },
  } as any;
});
