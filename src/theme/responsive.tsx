import React, { createContext, useContext, useMemo } from 'react';
import {
  useWindowDimensions,
  Dimensions,
  PixelRatio,
  ScaledSize,
  StyleSheet,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const BASE_WIDTH = 412;
export const BASE_HEIGHT = 917;

const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

function compute(size: ScaledSize) {
  const { width, height, fontScale } = size;

  const scaleW = width / BASE_WIDTH;
  const scaleH = height / BASE_HEIGHT;

  const SCALE_MIN = 0.9;
  const SCALE_MAX = 1.2;

  const scale = clamp(scaleW, SCALE_MIN, SCALE_MAX);
  const vScale = clamp(scaleH, SCALE_MIN, SCALE_MAX);

  const responsiveWidth = (value: number) => value * scaleW;
  const responsiveHeight = (value: number) => value * scaleH;

  const responsiveSize = (size: number) =>
    Math.round(PixelRatio.roundToNearestPixel(size * scale));

  const scaledFontSize = (size: number) => {
    const rf = RFValue(size, BASE_HEIGHT);
    const FONT_CAP = 1.3;
    const effectiveFontScale = Math.min(fontScale, FONT_CAP);
    return Math.round(
      PixelRatio.roundToNearestPixel(rf * (effectiveFontScale / fontScale)),
    );
  };

  return {
    width,
    height,
    fontScale,
    scaleW,
    scaleH,
    scale,
    vScale,
    responsiveWidth,
    responsiveHeight,
    responsiveSize,
    scaledFontSize,
  };
}

type Responsive = ReturnType<typeof compute>;

const ResponsiveCtx = createContext<Responsive | null>(null);

export const ResponsiveProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const size = useWindowDimensions();
  const value = useMemo(() => compute(size), [size]);
  return (
    <ResponsiveCtx.Provider value={value}>{children}</ResponsiveCtx.Provider>
  );
};

export function useResponsive(): Responsive {
  const ctx = useContext(ResponsiveCtx);
  if (!ctx) {
    const size = Dimensions.get('window');
    return compute(size);
  }
  return ctx;
}

export const R = {
  get width() {
    return Dimensions.get('window').width;
  },
  get height() {
    return Dimensions.get('window').height;
  },
  responsiveWidth(value: number) {
    return (Dimensions.get('window').width / BASE_WIDTH) * value;
  },
  responsiveHeight(value: number) {
    return (Dimensions.get('window').height / BASE_HEIGHT) * value;
  },
  responsiveSize(size: number) {
    const scaleW = Dimensions.get('window').width / BASE_WIDTH;
    const SCALE_MIN = 0.85;
    const SCALE_MAX = 1.25;
    const scale = clamp(scaleW, SCALE_MIN, SCALE_MAX);
    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
  },
  scaledFontSize(size: number) {
    const { fontScale } = Dimensions.get('window');
    const rf = RFValue(size, BASE_HEIGHT);
    const FONT_CAP = 1.3;
    const effectiveFontScale = Math.min(fontScale, FONT_CAP);
    return Math.round(
      PixelRatio.roundToNearestPixel(rf * (effectiveFontScale / fontScale)),
    );
  },
};

export function makeStyles<T extends Record<string, any>>(
  factory: (r: Responsive) => T,
) {
  return function useMakeStyles() {
    const r = useResponsive();
    return useMemo(() => StyleSheet.create(factory(r)), [r]);
  };
}

export function createScaledSheet<T extends Record<string, any>>(
  factory: (r: typeof R) => T,
) {
  return StyleSheet.create(factory(R));
}

export const hs = (v: number) => R.responsiveWidth(v);
export const vs = (v: number) => R.responsiveHeight(v);
export const ms = (v: number) => R.responsiveSize(v);
export const fs = (v: number) => R.scaledFontSize(v);
