import React, { useEffect, useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  Easing,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  Platform,
} from 'react-native';

type LoaderProps = {
  visible: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
  backdropColor?: string;
  spinnerSize?: number;
  spinnerThickness?: number;
  spinnerColor?: string;
  rotationDuration?: number;
  gifSource?: ImageSourcePropType;
  gifSize?: number;
  blockTouch?: boolean;
  accessibilityLabel?: string;
  testID?: string;

  preferFastImageOnAndroid?: boolean;
};

export const LoaderOverlay: React.FC<LoaderProps> = ({
  visible,
  contentContainerStyle,
  backdropColor = 'rgba(255,255,255,0.6)',
  spinnerSize = 55,
  spinnerThickness = 4,
  spinnerColor = '#d32f2f',
  rotationDuration = 1500,
  gifSource,
  gifSize = 40,
  blockTouch = true,
  accessibilityLabel = 'Loading',
  testID = 'loader',
  preferFastImageOnAndroid = true,
}) => {
  const rotate = useRef(new Animated.Value(0)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  const FastImageModule = useMemo(() => {
    if (Platform.OS !== 'android') return null;
    if (!preferFastImageOnAndroid) return null;
    try {
      const mod = require('react-native-fast-image');
      return mod?.default ?? mod;
    } catch {
      return null;
    }
  }, [preferFastImageOnAndroid]);

  useEffect(() => {
    if (visible) {
      rotate.setValue(0);
      loopRef.current = Animated.loop(
        Animated.timing(rotate, {
          toValue: 1,
          duration: rotationDuration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      loopRef.current.start();
    } else {
      loopRef.current?.stop();
      rotate.stopAnimation(() => rotate.setValue(0));
    }
    return () => {
      loopRef.current?.stop();
      rotate.stopAnimation();
    };
  }, [visible, rotationDuration, rotate]);

  const spin = useMemo(
    () =>
      rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    [rotate],
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent={Platform.OS === 'android'}
      onRequestClose={() => {}}
    >
      <View
        style={[styles.overlay, { backgroundColor: backdropColor }]}
        pointerEvents={blockTouch ? 'auto' : 'none'}
        accessible
        accessibilityRole="progressbar"
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        {}
        <Animated.View
          style={[
            styles.circle,
            {
              width: spinnerSize,
              height: spinnerSize,
              borderRadius: spinnerSize / 2,
              borderWidth: spinnerThickness,
              borderColor: spinnerColor,
              transform: [{ rotate: spin }],
            },
          ]}
        />

        {}
        {gifSource ? (
          FastImageModule ? (
            <FastImageModule
              source={gifSource as any}
              style={[
                styles.gif,
                { width: gifSize, height: gifSize, borderRadius: gifSize / 2 },
              ]}
              resizeMode={FastImageModule.resizeMode.contain}
            />
          ) : (
            <Image
              source={gifSource}
              style={[
                styles.gif,
                { width: gifSize, height: gifSize, borderRadius: gifSize / 2 },
              ]}
              resizeMode="contain"
            />
          )
        ) : null}

        <View style={contentContainerStyle} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    position: 'absolute',
  },
  circle: {
    position: 'absolute',
    borderTopColor: 'transparent',
  },
});
