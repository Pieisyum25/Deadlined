import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FloatingActionButton from "../components/buttons/FloatingActionButton";

import TaskList from "../components/lists/TaskList";


export default function TaskScreen({ navigation }) {
    return (
        <View style={styles.screen}>
            <ScrollView>
                <TaskList navigation={navigation}/>
            </ScrollView>
            <FloatingActionButton title="+" onPress={() => navigation.navigate("New Task")} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        height: '100%'
    }
});