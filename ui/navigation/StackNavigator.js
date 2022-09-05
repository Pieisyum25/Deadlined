import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CalendarScreen, CalendarSettingsScreen, HomeScreen, NewTaskScreen, SubtaskCompleteScreen, TaskScreen } from "../screens";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";


const Stack = createNativeStackNavigator();
const rootRouteNames = [undefined, "Home", "Tasks", "Calendar"];

export function HomeStackNavigator({ navigation, route }) {

    useLayoutEffect(() => tabVisibilityLayoutEffect(navigation, route), [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={optionsAddSettingsButton} />
            <Stack.Screen name="Subtask Complete" component={SubtaskCompleteScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
}

export function TaskStackNavigator({ navigation, route }) {
    
    useLayoutEffect(() => tabVisibilityLayoutEffect(navigation, route), [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Tasks" component={TaskScreen} options={optionsAddSettingsButton} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="New Task" component={NewTaskScreen} />
            <Stack.Screen name="Subtask Complete" component={SubtaskCompleteScreen} />
        </Stack.Navigator>
    );
}

export function CalendarStackNavigator({ navigation, route }) {
    
    useLayoutEffect(() => tabVisibilityLayoutEffect(navigation, route), [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Calendar" component={CalendarScreen} options={optionsAddSettingsButton} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Calendar Settings" component={CalendarSettingsScreen} />
        </Stack.Navigator>
    );
}

function tabVisibilityLayoutEffect(navigation, route) {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (rootRouteNames.includes(routeName)) navigation.setOptions({tabBarStyle: {display: 'flex'}});
    else navigation.setOptions({tabBarStyle: {display: 'none'}});
}

const optionsAddSettingsButton = ({ navigation }) => ({
    headerRight: () => <Ionicons name="settings" size={30} onPress={() => navigation.navigate("Settings")} />
});