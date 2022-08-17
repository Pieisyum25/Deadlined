import { View, Text } from "react-native";

import RectButton from "../components/buttons/RectButton"


export default function NewTaskScreen({ navigation }) {
    return (
        <View>
            <Text>This is the New Task screen.</Text>
            <RectButton title="Done" onPress={() => navigation.navigate("Tasks")} />
        </View>
    )
}