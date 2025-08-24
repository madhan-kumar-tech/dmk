import * as React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
  Text,
} from 'react-native-svg';

type Props = {
  width?: number;
  height?: number;
  values: any[];
  maxValue: number;
  labels?: String[];
  labelColors?: any[];
  labelFontSize?: number;
  labelDy?: number;
  opacity?: number;
  bottomShadowMax?: number;
};

export default function BarChart1({
  width = 113,
  height = 141,
  values,
  maxValue,
  labels,
  labelColors = ['#2196F3', '#E91E63', '#9C27B0'],
  labelFontSize = 12,
  labelDy = 12,
  opacity = 1,
  bottomShadowMax = 24,
}: Props) {
  const VB_W = 113;
  const VB_H = 141;
  const baseY = 99.9;

  const BAR = {
    left: { x1: 3.209, x2: 30.172, topMax: 15.128 },
    middle: { x1: 43.145, x2: 70.108, topMax: 37.765 },
    right: { x1: 83.048, x2: 110.011, topMax: 50.515 },
  };

  const span = (topMax: number) => baseY - topMax;
  const cx = (x1: number, x2: number) => (x1 + x2) / 2;
  const pct = (v: number, max: number) =>
    Math.max(0, Math.min(1, v / Math.max(1, max)));

  const vL = pct(values[0], maxValue);
  const vM = pct(values[1], maxValue);
  const vR = pct(values[2], maxValue);

  const SPAN_L = span(BAR.left.topMax);
  const SPAN_M = span(BAR.middle.topMax);
  const SPAN_R = span(BAR.right.topMax);

  const GLOBAL_SPAN = Math.min(SPAN_L, SPAN_M, SPAN_R);

  const topL = baseY - GLOBAL_SPAN * vL;
  const topM = baseY - GLOBAL_SPAN * vM;
  const topR = baseY - GLOBAL_SPAN * vR;

  const uid = React.useId?.() ?? Math.random().toString(36).slice(2);
  const id = (x: string) => `${x}__${uid}`;

  const SOCKET_Y = 95.05;
  const EPS = 1;
  const RING_INNER = 0.9;
  const CAP_NUDGE = {
    left: -0.3,
    middle: -0.3,
    right: -0.3,
  };

  const CAP_Y = {
    left: 14.128,
    middle: 36.765,
    right: 45.515,
  };

  const labelY = (top: number) =>
    Math.max(10, Math.min(top, SOCKET_Y) - (labelDy ?? 12));
  const clipL = Math.min(topL, SOCKET_Y - EPS);
  const clipM = Math.min(topM, SOCKET_Y - EPS);
  const clipR = Math.min(topR, SOCKET_Y + RING_INNER + 0.2);

  const showCapL = vL > 0;
  const showCapM = vM > 0;
  const showCapR = vR > 0;
  const capTopL = clipL;
  const capTopM = clipM;
  const capTopR = clipR;

  const showBarL = vL > 0;
  const showBarM = vM > 0;
  const showBarR = vR > 0;

  const CAP_OVERLAP = 5;

  const REF_TOP = SOCKET_Y + 1.5;
  const REF_OPACITY = 0.22;

  const FLARE_TOP = 8;
  const FLARE_BOT = 16;

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fill="none"
      opacity={opacity}
    >
      <Defs>
        {}
        <ClipPath id={id('clipLeft')}>
          <Rect
            x={BAR.left.x1}
            y={clipL}
            width={BAR.left.x2 - BAR.left.x1}
            height={VB_H - clipL}
          />
        </ClipPath>
        <ClipPath id={id('clipMid')}>
          <Rect
            x={BAR.middle.x1}
            y={clipM}
            width={BAR.middle.x2 - BAR.middle.x1}
            height={VB_H - clipM}
          />
        </ClipPath>
        <ClipPath id={id('clipRight')}>
          <Rect
            x={BAR.right.x1}
            y={clipR}
            width={BAR.right.x2 - BAR.right.x1}
            height={VB_H - clipR}
          />
        </ClipPath>
        <ClipPath id={id('clipReflLeft')}>
          <Path
            d={[
              `M ${BAR.left.x1 - FLARE_TOP} ${REF_TOP}`,
              `L ${BAR.left.x2 + FLARE_TOP} ${REF_TOP}`,
              `L ${BAR.left.x2 + FLARE_BOT} ${
                REF_TOP + Math.min(bottomShadowMax, bottomShadowMax * vL)
              }`,
              `L ${BAR.left.x1 - FLARE_BOT} ${
                REF_TOP + Math.min(bottomShadowMax, bottomShadowMax * vL)
              }`,
              'Z',
            ].join(' ')}
          />
        </ClipPath>

        <ClipPath id={id('clipReflMid')}>
          <Path
            d={[
              `M ${BAR.middle.x1 - FLARE_TOP} ${REF_TOP}`,
              `L ${BAR.middle.x2 + FLARE_TOP} ${REF_TOP}`,
              `L ${BAR.middle.x2 + FLARE_BOT} ${
                REF_TOP + Math.min(bottomShadowMax, bottomShadowMax * vM)
              }`,
              `L ${BAR.middle.x1 - FLARE_BOT} ${
                REF_TOP + Math.min(bottomShadowMax, bottomShadowMax * vM)
              }`,
              'Z',
            ].join(' ')}
          />
        </ClipPath>

        <ClipPath id={id('clipReflRight')}>
          <Path
            d={[
              `M ${BAR.right.x1 - FLARE_TOP} ${REF_TOP}`,
              `L ${BAR.right.x2 + FLARE_TOP} ${REF_TOP}`,
              `L ${BAR.right.x2 + FLARE_BOT} ${
                REF_TOP + Math.min(bottomShadowMax, bottomShadowMax * vR)
              }`,
              `L ${BAR.right.x1 - FLARE_BOT} ${
                REF_TOP + Math.min(bottomShadowMax, bottomShadowMax * vR)
              }`,
              'Z',
            ].join(' ')}
          />
        </ClipPath>

        {}
        <LinearGradient
          id={id('paint0')}
          x1={3.20914}
          y1={94.6128}
          x2={30.1722}
          y2={94.6128}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2196F3" />
          <Stop offset={0.9249} stopColor="#6EC6FF" stopOpacity={0.45} />
        </LinearGradient>
        <LinearGradient
          id={id('paint1')}
          x1={23.7954}
          y1={95.0315}
          x2={30.1725}
          y2={95.0315}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2196F3" />
          <Stop offset={0.9249} stopColor="#6EC6FF" />
        </LinearGradient>
        <LinearGradient
          id={id('paint2')}
          x1={3.20902}
          y1={95.0315}
          x2={9.5861}
          y2={95.0315}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2196F3" />
          <Stop offset={0.9249} stopColor="#6EC6FF" />
        </LinearGradient>
        <LinearGradient
          id={id('paint3')}
          x1={3.21158}
          y1={54.1524}
          x2={30.1743}
          y2={54.1524}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2196F3" />
          <Stop offset={0.9249} stopColor="#6EC6FF" />
        </LinearGradient>

        <LinearGradient
          id={id('paint4')}
          x1={43.1445}
          y1={94.2692}
          x2={70.1079}
          y2={94.2692}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E91E63" />
          <Stop offset={1} stopColor="#F48FB1" />
        </LinearGradient>
        <LinearGradient
          id={id('paint5')}
          x1={63.7309}
          y1={94.6879}
          x2={70.1081}
          y2={94.6879}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E91E63" />
          <Stop offset={1} stopColor="#F48FB1" />
        </LinearGradient>
        <LinearGradient
          id={id('paint6')}
          x1={43.1445}
          y1={94.6879}
          x2={49.5213}
          y2={94.6879}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E91E63" />
          <Stop offset={1} stopColor="#F48FB1" />
        </LinearGradient>
        <LinearGradient
          id={id('paint7')}
          x1={43.1469}
          y1={65.1281}
          x2={70.1103}
          y2={65.1281}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#E91E63" />
          <Stop offset={1} stopColor="#F48FB1" />
        </LinearGradient>

        {}
        <LinearGradient
          id={id('paint8')}
          x1={68.2061}
          y1={91.9563}
          x2={113.214}
          y2={91.9563}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.158} stopColor="#FF7D82" />
          <Stop offset={0.2316} stopColor="#FF6D7E" />
          <Stop offset={0.4136} stopColor="#FF4A75" />
          <Stop offset={0.4545} stopColor="#FF306E" />
          <Stop offset={0.5073} stopColor="#FF1667" />
          <Stop offset={0.5544} stopColor="#FF0663" />
          <Stop offset={0.5908} stopColor="#FF0061" />
          <Stop offset={0.8657} stopColor="#B2004F" />
        </LinearGradient>
        <LinearGradient
          id={id('paint9')}
          x1={103.634}
          y1={92.375}
          x2={110.012}
          y2={92.375}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.2798} stopColor="#B11942" />
          <Stop offset={0.8903} stopColor="#C42653" />
        </LinearGradient>
        <LinearGradient
          id={id('paint10')}
          x1={79.632}
          y1={92.375}
          x2={103.728}
          y2={92.375}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={1e-7} stopColor="#FEC194" />
          <Stop offset={1} stopColor="#FF0061" />
        </LinearGradient>
        <LinearGradient
          id={id('paint11')}
          x1={83.0503}
          y1={69.6898}
          x2={110.014}
          y2={69.6898}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={1e-7} stopColor="#FEC194" />
          <Stop offset={1} stopColor="#FF0061" />
        </LinearGradient>

        <LinearGradient
          id={id('paint12')}
          x1={3.20865}
          y1={60.3693}
          x2={30.1717}
          y2={60.3693}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2196F3" />
          <Stop offset={0.9249} stopColor="#6EC6FF" />
        </LinearGradient>
        <LinearGradient
          id={id('paint13')}
          x1={23.795}
          y1={60.7879}
          x2={30.172}
          y2={60.7879}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2196F3" />
          <Stop offset={0.9249} stopColor="#6EC6FF" />
        </LinearGradient>
        <LinearGradient
          id={id('paint14')}
          x1={3.20853}
          y1={60.7879}
          x2={9.58562}
          y2={60.7879}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2196F3" />
          <Stop offset={0.9249} stopColor="#6EC6FF" />
        </LinearGradient>
        <LinearGradient
          id={id('paint15')}
          x1={3.21109}
          y1={19.9089}
          x2={30.1738}
          y2={19.9089}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2196F3" />
          <Stop offset={0.9249} stopColor="#6EC6FF" />
        </LinearGradient>

        {}
        <LinearGradient
          id={id('paint22')}
          x1={83.048}
          y1={91.9563}
          x2={110.011}
          y2={91.9563}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9C27B0" />
          <Stop offset={1} stopColor="#CE93D8" />
        </LinearGradient>
        <LinearGradient
          id={id('paint23')}
          x1={103.634}
          y1={92.375}
          x2={110.012}
          y2={92.375}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#8E24AA" />
          <Stop offset={1} stopColor="#CE93D8" />
        </LinearGradient>
        <LinearGradient
          id={id('paint24')}
          x1={79.632}
          y1={92.375}
          x2={103.728}
          y2={92.375}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#BA68C8" />
          <Stop offset={1} stopColor="#9C27B0" />
        </LinearGradient>
        <LinearGradient
          id={id('paint25')}
          x1={83.0503}
          y1={69.6898}
          x2={110.014}
          y2={69.6898}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D1B3FF" />
          <Stop offset={1} stopColor="#9C27B0" />
        </LinearGradient>
      </Defs>

      {}
      {}
      <Path
        d="M28.91 99.902h16.555M68.49 99.902h16.555"
        stroke="#9AA4BE"
        strokeWidth={1.94366}
      />
      {}
      <Path
        d="M22.494 95.05H10.833l-7.652 5.028 6.378 6.536h14.21l6.377-6.536-7.652-5.028zM62.428 95.05H50.766l-7.652 5.028 6.378 6.536h14.21l6.378-6.536-7.652-5.028zM102.362 95.05H90.7l-7.652 5.028 6.378 6.536h14.21l6.378-6.536-7.652-5.028z"
        stroke="#9AA4BE"
        strokeWidth={3.53394}
      />

      {}
      <G
        clipPath={`url(#${id('clipReflLeft')})`}
        opacity={REF_OPACITY}
        pointerEvents="none"
      >
        <Path
          d="M30.172 53.396l-7.651-5.028h-11.66l-7.652 5.028v80.926l6.377 6.535h14.21l6.377-6.535V53.396z"
          fill={`url(#${id('paint0')})`}
        />
        <Path
          d="M30.173 53.396l-6.378-4.19v91.651l6.378-6.535V53.396z"
          fill={`url(#${id('paint1')})`}
        />
        <Path
          d="M3.209 53.396l6.377-4.19v91.651l-6.377-6.535V53.396z"
          fill={`url(#${id('paint2')})`}
        />
      </G>

      {showBarL && (
        <G clipPath={`url(#${id('clipLeft')})`}>
          {}
          <Path
            d="M30.172 19.152l-7.651-5.028H10.86l-7.651 5.028v80.927l6.377 6.535h14.209l6.377-6.535V19.152z"
            fill={`url(#${id('paint12')})`}
          />
          <Path
            d="M30.172 19.152l-6.377-4.19v91.652l6.377-6.535V19.152z"
            fill={`url(#${id('paint13')})`}
          />
          <Path
            d="M3.208 19.152l6.378-4.19v91.652l-6.378-6.535V19.152z"
            fill={`url(#${id('paint14')})`}
          />
        </G>
      )}
      {}
      {showCapL && (
        <G
          transform={`translate(0, ${
            capTopL - CAP_Y.left + CAP_NUDGE.left - CAP_OVERLAP
          })`}
          pointerEvents="none"
        >
          <Path
            d="M22.523 14.128H10.862l-7.651 5.027 6.377 6.535h14.21l6.376-6.535-7.651-5.027z"
            fill={`url(#${id('paint15')})`}
          />
        </G>
      )}

      <G
        clipPath={`url(#${id('clipReflMid')})`}
        opacity={REF_OPACITY}
        pointerEvents="none"
      >
        <Path
          d="M70.108 64.371l-7.651-5.028H50.796l-7.651 5.028v58.289l6.376 6.535h14.21l6.377-6.535V64.371z"
          fill={`url(#${id('paint4')})`}
        />
        <Path
          d="M70.108 64.371l-6.377-4.19v69.014l6.377-6.535V64.371z"
          fill={`url(#${id('paint5')})`}
        />
        <Path
          d="M43.145 64.371l6.376-4.19v69.014l-6.377-6.535V64.371z"
          fill={`url(#${id('paint6')})`}
        />
      </G>
      {}
      {showBarM && (
        <G clipPath={`url(#${id('clipMid')})`}>
          {}

          {}
          <Path
            d="M70.108 41.79l-7.651-5.028H50.796l-7.651 5.027v58.29l6.376 6.535h14.21l6.377-6.535v-58.29z"
            fill={`url(#${id('paint4')})`}
          />
          <Path
            d="M70.108 41.79l-6.377-4.19v69.014l6.377-6.535v-58.29z"
            fill={`url(#${id('paint5')})`}
          />
          <Path
            d="M43.145 41.79l6.376-4.19v69.014l-6.377-6.535v-58.29z"
            fill={`url(#${id('paint6')})`}
          />
        </G>
      )}
      {}
      {}
      {showCapM && (
        <G
          transform={`translate(0, ${
            capTopM - CAP_Y.middle + CAP_NUDGE.middle - CAP_OVERLAP
          })`}
          pointerEvents="none"
        >
          <Path
            d="M62.46 36.765H50.797l-7.651 5.027 6.377 6.535h14.21l6.377-6.535-7.652-5.027z"
            fill={`url(#${id('paint7')})`}
          />
        </G>
      )}

      {}
      <G
        clipPath={`url(#${id('clipReflRight')})`}
        opacity={REF_OPACITY}
        pointerEvents="none"
      >
        <Path
          d="M110.011 68.933l-7.651-5.028H90.7l-7.652 5.028v44.539l6.377 6.535h14.209l6.377-6.535V68.933z"
          fill={`url(#${id('paint8')})`}
        />
        <Path
          d="M110.011 68.933l-6.377-4.19v55.264l6.377-6.535V68.933z"
          fill={`url(#${id('paint9')})`}
        />
        <Path
          d="M83.048 68.933l6.377-4.19v55.264l-6.377-6.535V68.933z"
          fill={`url(#${id('paint10')})`}
        />
      </G>
      {}
      {showBarR && (
        <G clipPath={`url(#${id('clipRight')})`}>
          {}
          <Path
            d="M110.011 55.54l-7.651-5.028H90.7l-7.652 5.028v44.539l6.377 6.535h14.209l6.377-6.535V55.54z"
            fill={`url(#${id('paint22')})`}
          />
          <Path
            d="M110.011 55.54l-6.377-4.19v55.264l6.377-6.535V55.54z"
            fill={`url(#${id('paint23')})`}
          />
          <Path
            d="M83.048 55.54l6.377-4.19v55.264l-6.377-6.535V55.54z"
            fill={`url(#${id('paint24')})`}
          />
        </G>
      )}
      {}
      {showCapR && (
        <G
          transform={`translate(0, ${
            capTopR - CAP_Y.right + CAP_NUDGE.right - CAP_OVERLAP
          })`}
          pointerEvents="none"
        >
          <Path
            d="M102.362 50.515h-11.66l-7.652 5.028 6.377 6.535h14.21l6.377-6.535-7.652-5.028z"
            fill={`url(#${id('paint25')})`}
          />
        </G>
      )}

      {}
      <Text
        x={cx(BAR.left.x1, BAR.left.x2)}
        y={labelY(capTopL - 7)}
        fontSize={labelFontSize ?? 12}
        fontWeight="700"
        fill={labelColors[0]}
        textAnchor="middle"
      >
        {labels?.[0] ?? values[0]}
      </Text>
      <Text
        x={cx(BAR.middle.x1, BAR.middle.x2)}
        y={labelY(capTopM - 7)}
        fontSize={labelFontSize ?? 12}
        fontWeight="700"
        fill={labelColors[1]}
        textAnchor="middle"
      >
        {labels?.[1] ?? values[1]}
      </Text>
      <Text
        x={cx(BAR.right.x1, BAR.right.x2)}
        y={labelY(capTopR - 7)}
        fontSize={labelFontSize ?? 12}
        fontWeight="700"
        fill={labelColors[2]}
        textAnchor="middle"
      >
        {labels?.[2] ?? values[2]}
      </Text>
    </Svg>
  );
}
