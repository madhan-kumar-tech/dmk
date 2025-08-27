import React from 'react';
import { Image, View } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
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
  size = 60,
  ring = true,
  ringWidth = 4,
  topColor = '#000000',
  bottomColor = '#d11a1a',
}) => {
  // total canvas must include the ring outside the image
  const box = size + ringWidth * 2;
  const squareSize = size + ringWidth;
  const squarePosition = ringWidth / 2;

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
        <Svg
          width={box}
          height={box}
          style={{ position: 'absolute', pointerEvents: 'none' }}
        >
          <Defs>
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

          <Rect
            x={squarePosition}
            y={squarePosition}
            width={squareSize}
            height={squareSize}
            fill="none"
            stroke="url(#halfStroke)"
            strokeWidth={ringWidth}
          />
        </Svg>
      )}

      <Image
        source={uri ? { uri } : IMAGES.headerLogo}
        style={{ width: size, height: size, resizeMode: 'stretch' }}
      />
    </View>
  );
};
