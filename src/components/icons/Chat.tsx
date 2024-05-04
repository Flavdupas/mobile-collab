import * as React from "react";
import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";
interface ChatProps {
  color: ColorValue;
}
const Chat: React.FC<ChatProps> = ({ color }) => (
  <Svg width={32} height={28} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2.5}
      d="M19.833 3.894A11.613 11.613 0 0 0 14 2.334C7.557 2.333 2.333 7.556 2.333 14c0 1.867.439 3.63 1.218 5.195.207.415.276.89.156 1.34l-.695 2.596a1.517 1.517 0 0 0 1.857 1.857l2.597-.694c.449-.12.924-.052 1.34.155A11.618 11.618 0 0 0 14 25.667c6.443 0 11.667-5.224 11.667-11.667 0-2.125-.569-4.117-1.561-5.833"
    />
  </Svg>
);
export default Chat;
