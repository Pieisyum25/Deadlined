import { NavigationContainer } from "@react-navigation/native";
import { LoginStackNavigator } from "./ui/navigation/LoginStackNavigator";


export default function App() {
  return (
    <NavigationContainer>
      <LoginStackNavigator />
    </NavigationContainer>
  );
}