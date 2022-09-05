import { View, Text } from "react-native";
import SubtaskList from "../components/lists/SubtaskList";


export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Text>Your Goals for Today:</Text>
            <SubtaskList navigation={navigation} />
        </View>
    )
}