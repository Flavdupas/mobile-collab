import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import store, { RootState, persistor } from "../src/store/store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../src/assets/fonts/SpaceMono-Regular.ttf"),
  });
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootLayoutNav />
        </PersistGate>
      </Provider>
    </>
  );
}

function RootLayoutNav() {
  const token = useSelector((state: RootState) => state.login.token);

  useEffect(() => {
    //on regarde si il est deja connecte donc possede un token
    const isAuth = async () => {
      if (token) {
        router.replace("/home");
        //persistor.purge();
      }
    };
    isAuth();
  }, []);

  return (
    <>
      <StatusBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(connected)" />
        <Stack.Screen name="loading" />
      </Stack>
    </>
  );
}
