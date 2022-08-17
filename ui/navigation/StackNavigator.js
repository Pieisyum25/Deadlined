import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CalendarScreen, CalendarSettingsScreen, HomeScreen, NewTaskScreen, SubtaskCompleteScreen, TaskScreen } from "../screens";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";


const Stack = createNativeStackNavigator();
const rootRouteNames = [undefined, "Home", "Tasks", "Calendar"];

export function HomeStackNavigator({ navigation, route }) {

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (rootRouteNames.includes(routeName)) navigation.setOptions({tabBarStyle: {display: 'flex'}});
        else navigation.setOptions({tabBarStyle: {display: 'none'}});
    }, [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Subtask Complete" component={SubtaskCompleteScreen} />
        </Stack.Navigator>
    );
}

export function TaskStackNavigator({ navigation, route }) {
    
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (rootRouteNames.includes(routeName)) navigation.setOptions({tabBarStyle: {display: 'flex'}});
        else navigation.setOptions({tabBarStyle: {display: 'none'}});
    }, [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Tasks" component={TaskScreen} />
            <Stack.Screen name="New Task" component={NewTaskScreen} />
        </Stack.Navigator>
    );
}

export function CalendarStackNavigator({ navigation, route }) {
    
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (rootRouteNames.includes(routeName)) navigation.setOptions({tabBarStyle: {display: 'flex'}});
        else navigation.setOptions({tabBarStyle: {display: 'none'}});
    }, [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Calendar" component={CalendarScreen} />
            <Stack.Screen name="Calendar Settings" component={CalendarSettingsScreen} />
        </Stack.Navigator>
    );
}