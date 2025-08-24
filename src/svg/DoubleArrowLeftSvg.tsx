import React from "react";
import Svg, { Path } from "react-native-svg";

type DoubleArrowLeftProps = {
  width?: number;
  height?: number;
  color?: string;
};

const DoubleArrowLeftSvg: React.FC<DoubleArrowLeftProps> = ({
  width = 17,
  height = 14,
  color = "white",
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 17 14" fill="none">
      <Path
        d="M6.32324 12.88L1.43324 7.99C0.855742 7.4125 0.855742 6.4675 1.43324 5.89L6.32324 1"
        stroke={color}
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.3232 12.88L10.4332 7.99C9.85574 7.4125 9.85574 6.4675 10.4332 5.89L15.3232 1"
        stroke={color}
        strokeWidth={2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DoubleArrowLeftSvg;
