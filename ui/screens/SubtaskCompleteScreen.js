import { View, Text } from "react-native";

import RectButton from "../components/buttons/RectButton"


export default function SubtaskCompleteScreen({ navigation }) {
    return (
        <View>
            <Text>This is the Subtask Complete screen.</Text>
            <RectButton title="Done" onPress={() => navigation.navigate("Home")} />
        </View>
    )
}