import * as React from "react";
import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";
interface HomeProps {
  color:ColorValue;
}
const Home:React.FC<HomeProps> = ({color}) => (
  <Svg width={27} height={27} fill="none">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={2}
      d="M24.75 13.73v1.71c0 4.389 0 6.583-1.318 7.947-1.318 1.363-3.44 1.363-7.682 1.363h-4.5c-4.243 0-6.364 0-7.682-1.363C2.25 22.023 2.25 19.829 2.25 15.44v-1.712c0-2.574 0-3.861.584-4.928.584-1.068 1.651-1.73 3.786-3.054L8.87 4.35c2.256-1.4 3.384-2.1 4.63-2.1s2.374.7 4.63 2.1l2.25 1.397c2.135 1.324 3.202 1.986 3.786 3.054M16.875 20.25h-6.75"
    />
  </Svg>
);
export default Home;
