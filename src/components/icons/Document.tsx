import * as React from "react"
import Svg, { Path } from "react-native-svg"

const Document = () => (
  <Svg
    width={30}
    height={30}
    fill="none"
  >
    <Path
      stroke="#261E35"
      strokeLinecap="round"
      strokeWidth={2}
      d="M10 15h1.25M20 15h-5M20 10h-1.25M15 10h-5M10 20h6.25M3.75 17.5v-5c0-4.714 0-7.071 1.464-8.536C6.68 2.5 9.036 2.5 13.75 2.5h2.5c4.714 0 7.071 0 8.535 1.464.817.817 1.178 1.91 1.338 3.536m.127 5v5c0 4.714 0 7.071-1.465 8.535C23.322 27.5 20.964 27.5 16.25 27.5h-2.5c-4.714 0-7.071 0-8.536-1.465-.816-.816-1.177-1.91-1.337-3.535"
    />
  </Svg>
)
export default Document;
