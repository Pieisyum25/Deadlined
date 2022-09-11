import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";

// Navigator for managing the login stack:
const Stack = createNativeStackNavigator();


// LoginStackNavigator for navigating between the login screen and the app's main content:
export function LoginStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={BottomTabNavigator} />
        </Stack.Navigator>
    );
}