import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import logo from "./src/components/logo";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="logo"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="logo" component={logo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
