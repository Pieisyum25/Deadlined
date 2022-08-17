import { NavigationContainer } from "@react-navigation/native";

import BottomTabNavigator from "./ui/navigation/BottomTabNavigator";


export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}