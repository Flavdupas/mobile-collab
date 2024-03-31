import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const Validate = () => (
  <Svg
    width={20}
    height={20}
    fill="none"
    stroke="#fff"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    aria-labelledby="okIconTitle"
    color="#fff"
    viewBox="0 0 24 24"
  >
    <Path d="m4 13 5 5L20 7" />
  </Svg>
)
export default Validate
