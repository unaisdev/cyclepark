import {
  createBottomTabNavigator,
  type BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { ListScreen } from "../screens/ListScreen";
import { MapScreen } from "../screens/MapScreen";
import { SettingsScreen } from "../screens/settings/SettingsScreen";
import { FloatingTabBar } from "./FloatingTabBar";
import type { RootTabParamList } from "./types";

const Tab = createBottomTabNavigator<RootTabParamList>();

/** Referencia estable: un `tabBar` inline nuevo en cada render suele remontar la barra y relanzar Reanimated (springs) sin parar. */
function renderFloatingTabBar(props: BottomTabBarProps) {
  return <FloatingTabBar {...props} />;
}

export function RootTabs() {
  return (
    <Tab.Navigator
      tabBar={renderFloatingTabBar}
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
