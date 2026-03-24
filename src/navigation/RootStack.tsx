import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { RootTabs } from "./RootTabs";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={RootTabs} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
