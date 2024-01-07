import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "../../../src/components/connected/CustomDrawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width:325
          }
        }}
        
        drawerContent={(props) => <CustomDrawer props={props} />}
      />
    </GestureHandlerRootView>
  );
}
