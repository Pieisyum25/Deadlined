import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";
import EditTaskScreen from "../screens/EditTaskScreen";
import EditSubtaskScreen from "../screens/EditSubtaskScreen";
import HomeScreen from "../screens/HomeScreen";
import SubtaskCompleteScreen from "../screens/SubtaskCompleteScreen";
import TaskScreen from "../screens/TaskScreen";
import CalendarScreen from "../screens/CalendarScreen";
import CalendarSettingsScreen from "../screens/CalendarSettingsScreen";
import TaskCompleteScreen from "../screens/TaskCompleteScreen";

// MainStackNavigator contains the three main StackNavigators, each used in a tab in BottomTabNavigator:

// Navigator for managing all the StackNavigators:
const Stack = createNativeStackNavigator();
// Route names of the main screen of each stack, used for knowing when tabs should be shown:
const rootRouteNames = [undefined, "Home", "Tasks", "Calendar"];


// HomeStackNavigator holds screens used in the Home tab:
export function HomeStackNavigator({ navigation, route }) {

    useLayoutEffect(() => tabVisibilityLayoutEffect(navigation, route), [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={optionsAddSettingsButton} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Edit Subtask" component={EditSubtaskScreen} />
            <Stack.Screen name="Subtask Complete" component={SubtaskCompleteScreen} />
            <Stack.Screen name="Task Complete" component={TaskCompleteScreen} />
        </Stack.Navigator>
    );
}

// TaskStackNavigator holds screens used in the Tasks tab:
export function TaskStackNavigator({ navigation, route }) {

    useLayoutEffect(() => tabVisibilityLayoutEffect(navigation, route), [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Tasks" component={TaskScreen} options={optionsAddSettingsButton} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Edit Task" component={EditTaskScreen} options={({ route }) => ({ title: route.params.newTask ? "Add Task" : "Edit Task" })} />
            <Stack.Screen name="Edit Subtask" component={EditSubtaskScreen} options={({ route }) => ({ title: route.params.newSubtask ? "Add Subtask" : "Edit Subtask" })} />
            <Stack.Screen name="Subtask Complete" component={SubtaskCompleteScreen} />
            <Stack.Screen name="Task Complete" component={TaskCompleteScreen} />
        </Stack.Navigator>
    );
}


// CalendarStackNavigator holds screens used in the Calendar tab:
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


// A layout effect used by all the StackNavigators to only show the bottom tab bar when on one of the main 3 screens:
function tabVisibilityLayoutEffect(navigation, route) {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (rootRouteNames.includes(routeName)) navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    else navigation.setOptions({ tabBarStyle: { display: 'none' } });
}

// A settings button added to the 3 main screens' headers to allow access to the settings screen:
const optionsAddSettingsButton = ({ navigation }) => ({
    headerRight: () =>
        <Ionicons
            style={{ margin: 10 }}
            name="settings"
            size={25}
            onPress={() => navigation.navigate("Settings")}
        />
});