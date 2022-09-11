import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CalendarStackNavigator, HomeStackNavigator, TaskStackNavigator } from "./MainStackNavigator";


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home Tab" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Calendar Tab"
        component={CalendarStackNavigator}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Home Tab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Tasks Tab"
        component={TaskStackNavigator}
        options={{
          tabBarLabel: "Tasks",
          tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
}