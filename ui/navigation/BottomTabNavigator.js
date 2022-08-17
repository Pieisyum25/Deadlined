import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CalendarStackNavigator, HomeStackNavigator, TaskStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home Tab" component={HomeStackNavigator} />
      <Tab.Screen name="Tasks Tab" component={TaskStackNavigator} />
      <Tab.Screen name="Calendar Tab" component={CalendarStackNavigator} />
    </Tab.Navigator>
  );
}