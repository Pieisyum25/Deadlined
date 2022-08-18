import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./ui/navigation/BottomTabNavigator";
import { Metrics } from "./ui/styles";


export default function App() {
  Metrics.update();
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}