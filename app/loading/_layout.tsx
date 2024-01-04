import { Stack } from "expo-router"
const Tab = () => {
    return (
        <Stack screenOptions={{
            headerShown:false,
            animation: "slide_from_right",
        }}>
            <Stack.Screen name="register"/>
        </Stack>
    )
}

export default Tab;