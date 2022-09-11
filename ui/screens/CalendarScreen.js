import { View, Text } from "react-native";
import RectButton from "../components/buttons/RectButton"


// CalendarScreen for showing tasks and subtasks on a calender (incomplete):
export default function CalendarScreen({ navigation }) {
    return (
        <View>
            <Text>This is the Calendar screen.</Text>
            <RectButton title="Settings" onPress={() => navigation.navigate("Calendar Settings")} />
        </View>
    )
}