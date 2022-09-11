import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./api/store";
import { LoginStackNavigator } from "./ui/navigation/LoginStackNavigator";


// App is wrapped in a NavigationContainer to allow React Native Navigation, and
// a Provider with a store for use of Redux to manage the state of the user's tasks:
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <LoginStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}