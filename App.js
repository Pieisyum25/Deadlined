import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { LoginStackNavigator } from "./ui/navigation/LoginStackNavigator";
import store from "./store";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <LoginStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}