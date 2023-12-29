import { Stack } from "expo-router"
const Tab = () => {
    return (
        <Stack screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="register"/>
            <Stack.Screen name="login"/>
        </Stack>
    )
}

export default Tab;