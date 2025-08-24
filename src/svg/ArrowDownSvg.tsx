import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const ChevronDownSvg: React.FC<Props> = ({
  width = 22,
  height = 12,
  color = "#9AA0A6",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 12" fill="none">
      <Path
        d="M2 2L11 10L20 2"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default ChevronDownSvg;
