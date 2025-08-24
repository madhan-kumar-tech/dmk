import React from 'react';
import { Image, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { IMAGES } from '../../assets';

type Props = {
  uri?: string;
  size?: number;
  ring?: boolean;
  ringWidth?: number;
  topColor?: string;
  bottomColor?: string;
};

export const Avatar: React.FC<Props> = ({
  uri,
  size = 56,
  ring = true,
  ringWidth = 4,
  topColor = '#000000',
  bottomColor = '#d11a1a',
}) => {
  // total canvas must include the ring outside the image
  const box = size + ringWidth * 2;
  const c = box / 2;
  // radius so the ring sits outside the image edge
  const r = size / 2 + (ring ? ringWidth / 2 : 0);

  return (
    <View
      style={{
        width: box,
        height: box,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {ring && (
        <Svg width={box} height={box} style={{ position: 'absolute', pointerEvents: 'none' }}>
          <Defs>
            {/* Hard split at 50%: top half = black, bottom half = red */}
            <LinearGradient
              id="halfStroke"
              x1="0"
              y1="0"
              x2="0"
              y2={box}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor={topColor} />
              <Stop offset="50%" stopColor={topColor} />
              <Stop offset="50%" stopColor={bottomColor} />
              <Stop offset="100%" stopColor={bottomColor} />
            </LinearGradient>
          </Defs>

          <Circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="url(#halfStroke)"
            strokeWidth={ringWidth}
          />
        </Svg>
      )}

      <Image
        source={uri ? { uri } : IMAGES.headerLogo}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
};
