import { Stack } from "expo-router"
const Tab = () => {
    return (
        <Stack screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name="home"/>
            <Stack.Screen name="post"/>
            <Stack.Screen name="service"/>
            <Stack.Screen name="message"/>
            <Stack.Screen name="match"/>
        </Stack>
    )
}

export default Tab;