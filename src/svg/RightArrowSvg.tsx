import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  color?: string;
};

const RightArrowSvg: React.FC<Props> = ({
  width = 18,
  height = 18,
  color = "black",
}) => (
  <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
    <Path
      d="M6.68262 14.9401L11.5726 10.0501C12.1501 9.47256 12.1501 8.52756 11.5726 7.95006L6.68262 3.06006"
      stroke={color}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default RightArrowSvg;
