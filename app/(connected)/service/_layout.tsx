import { Stack } from "expo-router"
const Tab = () => {
    return (
        <Stack screenOptions={{
            headerShown:false
        }}>
          <Stack.Screen name="show" />
        </Stack>
    )
}

export default Tab;