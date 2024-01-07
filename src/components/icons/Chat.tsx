import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Chat = () => (
  <Svg
    width={30}
    height={30}
    fill="none"
  >
    <Path
      stroke="#261E35"
      strokeLinecap="round"
      strokeWidth={2.5}
      d="M21.25 4.172A12.443 12.443 0 0 0 15 2.5C8.096 2.5 2.5 8.096 2.5 15c0 2 .47 3.89 1.304 5.566.222.445.296.954.167 1.435l-.744 2.782a1.625 1.625 0 0 0 1.99 1.99l2.782-.744c.48-.129.99-.055 1.435.167A12.447 12.447 0 0 0 15 27.5c6.904 0 12.5-5.596 12.5-12.5 0-2.277-.609-4.411-1.672-6.25"
    />
  </Svg>
)
export default Chat;
