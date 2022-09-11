import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./api/store";
import { LoginStackNavigator } from "./ui/navigation/LoginStackNavigator";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <LoginStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}