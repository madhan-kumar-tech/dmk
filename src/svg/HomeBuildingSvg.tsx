import React from "react";
import Svg, { Path } from "react-native-svg";

interface HomeIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const HomeBuildingSvg: React.FC<HomeIconProps> = ({
  width = 24,
  height = 24,
  color = "#9AA0A6",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M14.041 13.641L8.592 9.377C7.949 8.873 7.052 8.873 6.407 9.377L0.96 13.641C0.35 14.118 0 14.835 0 15.61V24.001H15V15.609C15 14.835 14.65 14.118 14.041 13.641ZM14 23H1V15.609C1 15.144 1.21 14.713 1.576 14.427L7.023 10.163C7.304 9.944 7.696 9.944 7.975 10.163L13.424 14.427C13.789 14.713 13.999 15.144 13.999 15.609V23H14ZM5 20H10V15H5V20ZM6 16H9V19H6V16ZM18 13H20V14H18V13ZM18 17H20V18H18V17ZM14 5H16V6H14V5ZM20 6H18V5H20V6ZM14 9H16V10H14V9ZM18 9H20V10H18V9ZM24 2.5V24H17V23H23V2.5C23 1.673 22.327 1 21.5 1H12.5C11.673 1 11 1.673 11 2.5V9L10 8.217V2.5C10 1.121 11.121 0 12.5 0H21.5C22.879 0 24 1.121 24 2.5Z"
        fill={color}
      />
    </Svg>
  );
};

export default HomeBuildingSvg;
