import React from 'react';
import { TextStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { AppText } from '../ui/AppText';
import { TextVariantKey } from '../../theme';

type GradientTextProps = {
  text: string;
  textVariant?: TextVariantKey;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  style?: TextStyle;
  colors?: string[];
};

export const GradientText: React.FC<GradientTextProps> = ({
  text,
  textVariant = 'body',
  style,
  start = { x: 0.5, y: 0 },
  end = { x: 0.5, y: 1 },
  colors = ['#000000', '#000000', '#FF0202', '#FF0202'],
}) => {
  return (
    <MaskedView
      maskElement={
        <AppText variant={textVariant} style={[style]}>
          {text}
        </AppText>
      }
    >
      <LinearGradient
        colors={colors}
        locations={[0, 0.5, 0.5, 1]}
        start={start}
        end={end}
      >
        <AppText variant={textVariant} style={[style, { opacity: 0 }]}>
          {text}
        </AppText>
      </LinearGradient>
    </MaskedView>
  );
};
