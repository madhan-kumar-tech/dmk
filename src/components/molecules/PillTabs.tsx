import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Pressable,
  Animated,
  LayoutChangeEvent,
  Platform,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { makeStyles } from '../../theme/responsive';

type Tab = { key: string; label: string };
type Props = {
  tabs: Tab[];
  value: string;
  onChange: (key: string) => void;
  height?: number;
  radius?: number;
};

export const PillTabs: React.FC<Props> = ({
  tabs,
  value,
  onChange,
  height = 44,
  radius = 22,
}) => {
  const s = useStyles();
  const [w, setW] = useState(0);

  const inset = 6;
  const segW = useMemo(
    () => (w ? (w - inset * 2) / tabs.length : 0),
    [w, tabs.length],
  );

  const activeIndex = Math.max(
    0,
    tabs.findIndex(t => t.key === value),
  );
  const anim = useRef(new Animated.Value(activeIndex)).current;

  React.useEffect(() => {
    Animated.spring(anim, {
      toValue: activeIndex,
      useNativeDriver: true,
      friction: 12,
      tension: 120,
    }).start();
  }, [activeIndex, anim]);

  const onLayout = (e: LayoutChangeEvent) => setW(e.nativeEvent.layout.width);

  const translateX = anim.interpolate({
    inputRange: [0, Math.max(1, tabs.length - 1)],
    outputRange: [inset, inset + (tabs.length - 1) * segW],
    extrapolate: 'clamp',
  });

  return (
    <View onLayout={onLayout}>
      {}
      <View style={[s.shellShadow, { height, borderRadius: radius + 2 }]} />

      {}
      <View
        style={[s.shell, { height, borderRadius: radius + 2, padding: inset }]}
        pointerEvents="box-none"
      >
        <LinearGradient
          colors={['#ffffff', '#f3f4f6']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ ...s.shellBg, borderRadius: radius + 2 }}
        />

        {}
        {segW > 0 && (
          <Animated.View
            style={[
              s.thumbWrap,
              {
                height: height - inset * 2,
                width: segW,
                borderRadius: radius,
                transform: [{ translateX }],
              },
            ]}
            pointerEvents="none"
          >
            <View style={s.thumbShadow} />
            <View style={s.thumbClip}>
              {}
              <LinearGradient
                colors={['#000000', '#FF0202']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <LinearGradient
                colors={['rgba(0,0,0,0.13)', 'transparent']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={[StyleSheet.absoluteFillObject, { borderRadius: 999 }]}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.13)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFillObject, { borderRadius: 999 }]}
              />
            </View>
          </Animated.View>
        )}

        {}
        <LabelsRow
          tabs={tabs}
          height={height}
          segW={segW}
          onChange={onChange}
          anim={anim}
        />
      </View>
    </View>
  );
};

const LabelsRow = React.memo(
  function LabelsRow({
    tabs,
    height,
    segW,
    onChange,
    anim,
  }: {
    tabs: Tab[];
    height: number;
    segW: number;
    onChange: (k: string) => void;
    anim: Animated.Value;
  }) {
    const s = useStyles();

    return (
      <View style={s.row} pointerEvents="box-none">
        {tabs.map((t, i) => {
          const activeOpacity = anim.interpolate({
            inputRange: [i - 0.5, i, i + 0.5],
            outputRange: [0, 1, 0],
            extrapolate: 'clamp',
          });
          const inactiveOpacity = anim.interpolate({
            inputRange: [i - 0.5, i, i + 0.5],
            outputRange: [1, 0, 1],
            extrapolate: 'clamp',
          });

          return (
            <Pressable
              key={t.key}
              onPress={() => onChange(t.key)}
              style={[s.item, { height, width: segW || undefined }]}
            >
              {}
              <Animated.Text
                numberOfLines={1}
                style={[s.lblInactive, { opacity: inactiveOpacity }]}
              >
                {t.label}
              </Animated.Text>

              {}
              <Animated.Text
                numberOfLines={1}
                style={[s.lblActive, { opacity: activeOpacity }]}
              >
                {t.label}
              </Animated.Text>
            </Pressable>
          );
        })}
      </View>
    );
  },

  (prev, next) =>
    prev.tabs === next.tabs &&
    prev.height === next.height &&
    prev.segW === next.segW &&
    prev.onChange === next.onChange &&
    prev.anim === next.anim,
);

const useStyles = makeStyles(() => ({
  shellShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        backgroundColor: 'transparent',
      },
      android: { elevation: 6, backgroundColor: 'transparent' },
    }),
  } as ViewStyle,

  shell: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    justifyContent: 'center',
  } as ViewStyle,

  shellBg: {
    ...StyleSheet.absoluteFillObject,
  } as ViewStyle,

  row: { flexDirection: 'row', alignItems: 'center' } as ViewStyle,

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  lblInactive: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: '#151515',
    ...(Platform.OS === 'android'
      ? {
          includeFontPadding: false,
          textAlignVertical: 'center' as TextStyle['textAlignVertical'],
        }
      : null),
  } as TextStyle,

  lblActive: {
    position: 'absolute',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: '#ffffff',
    ...(Platform.OS === 'android'
      ? {
          includeFontPadding: false,
          textAlignVertical: 'center' as TextStyle['textAlignVertical'],
        }
      : null),
  } as TextStyle,

  thumbWrap: {
    position: 'absolute',
    top: 6,
    left: 0,
    right: 0,
    borderRadius: 999,
  } as ViewStyle,

  thumbShadow: Platform.select({
    ios: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      shadowColor: '#000',
      shadowOpacity: 0.18,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      borderRadius: 999,
      backgroundColor: 'transparent',
    },
    android: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      elevation: 3,
      borderRadius: 999,
      backgroundColor: 'transparent',
    },
  }) as ViewStyle,

  thumbClip: {
    flex: 1,
    borderRadius: 999,
    overflow: 'hidden',
  } as ViewStyle,
}));
