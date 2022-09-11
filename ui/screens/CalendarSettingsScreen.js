import { View, Text } from "react-native";
import RectButton from "../components/buttons/RectButton"


// CalendarSettingsScreen for customising the calendar (incomplete):
export default function CalendarSettingsScreen({ navigation }) {
    return (
        <View>
            <Text>This is the Calendar Settings screen.</Text>
            <RectButton title="Done" onPress={() => navigation.navigate("Calendar")}/>
        </View>
    )
}