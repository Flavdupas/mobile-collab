import { Stack } from "expo-router"
const Tab = () => {
    return (
        <Stack screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="home"/>
        </Stack>
    )
}

export default Tab;