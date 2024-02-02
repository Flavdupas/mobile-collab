import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Plus = () => {
  return (
    <Svg width={24} height={24} fill="none">
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={3}
        d="M12.5 2v20M2 11.5h20"
      />
    </Svg>
  );
};

export default Plus;