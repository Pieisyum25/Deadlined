import { View, Text } from "react-native";

import RectButton from "../components/buttons/RectButton"


export default function TaskScreen({ navigation }) {
    return (
        <View>
            <Text>This is the Task screen.</Text>
            <RectButton title="+" onPress={() => navigation.navigate("New Task")} />
        </View>
    )
}