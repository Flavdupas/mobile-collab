
import CustomTabs from "../../../../src/components/connected/CustomTab";
import { Tabs } from "expo-router";

export default function () {
  return (
    <Tabs
      tabBar={() => <CustomTabs />}
      screenOptions={{
        headerShown:false,
        //animation: "slide_from_right",
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="service" />
      <Tabs.Screen name="post" />
      <Tabs.Screen name="match" />
      <Tabs.Screen name="message" />
    </Tabs>
  );
}
