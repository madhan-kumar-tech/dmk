import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  radius?: number;
  opacity?: number;
  thickness?: number;
  style?: ViewStyle;
  edges?: { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean };
};

export const InnerShadow: React.FC<Props> = ({
  radius = 12,
  opacity = 0.04,
  thickness = 10,
  style,
  edges = { top: true, right: true, bottom: true, left: true },
}) => {
  const col = `rgba(0,0,0,${opacity})`;

  return (
    <View
      pointerEvents="none"
      style={[
        {
          ...StyleSheet.absoluteFillObject,
          borderRadius: radius,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {edges.top && (
        <LinearGradient
          colors={[col, 'transparent']}
          locations={[0, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: thickness,
          }}
        />
      )}
      {edges.bottom && (
        <LinearGradient
          colors={[col, 'transparent']}
          locations={[0, 1]}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: thickness,
          }}
        />
      )}
      {edges.left && (
        <LinearGradient
          colors={[col, 'transparent']}
          locations={[0, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: thickness,
          }}
        />
      )}
      {edges.right && (
        <LinearGradient
          colors={[col, 'transparent']}
          locations={[0, 1]}
          start={{ x: 1, y: 0.5 }}
          end={{ x: 0, y: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: thickness,
          }}
        />
      )}
    </View>
  );
};
