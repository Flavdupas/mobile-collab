import { Stack } from "expo-router";

const Tab = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation:"slide_from_right"
      }}

    >
      <Stack.Screen name="1" />
      <Stack.Screen name="2" />
      <Stack.Screen name="3" />
      <Stack.Screen name="4" />
      <Stack.Screen name="5" />
      <Stack.Screen name="6" />
    </Stack>
  );
};

export default Tab;
