import { Stack } from "expo-router";
import React, { useState } from "react";
import ConnectedContext from "../../src/components/connected/context/RouteContext";

const Tab = () => {
    /* VARIABLES */
  const [currentIndexTabBar, setCurrentIndexTabBar] = useState<number>(1);

  /* LAYOUT */
  return (
    <ConnectedContext.Provider value={{currentIndexTabBar,setCurrentIndexTabBar}}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen name="post" />
        <Stack.Screen name="service" />
        <Stack.Screen name="message" />
        <Stack.Screen name="match" />
      </Stack>
    </ConnectedContext.Provider>
  );
};

export default Tab;
