import Svg, { Path } from "react-native-svg";

const Chevron = () => {
    return (
        <>
            <Svg
                width={7}
                height={12}
                fill="none"

            >
                <Path
                    fill="#F2E6FF"
                    d="M6.53 5.47a.751.751 0 0 1 0 1.062l-4.5 4.5A.751.751 0 0 1 .968 9.97L4.938 6 .97 2.03A.751.751 0 0 1 2.032.968l4.5 4.5-.002.002Z"
                />
            </Svg>
        </>
    )
}

export default Chevron;