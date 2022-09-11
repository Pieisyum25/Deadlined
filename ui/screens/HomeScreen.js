import { View, Text, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectCurrentSubtasks } from "../../logic/StateViewModel";
import { getDatePrompt } from "../../logic/util";
import RectButton from "../components/buttons/RectButton";
import CardContainer from "../components/containers/CardContainer";
import RowContainer from "../components/containers/RowContainer";
import Heading from "../components/text/Heading";
import Subheading from "../components/text/Subheading";


// Homescreen displays a list of all current subtasks that should be worked on today:
export default function HomeScreen({ navigation }) {

    // Array of current subtasks:
    const currentSubtasks = useSelector(selectCurrentSubtasks);

    // Returns an item representing a current subtask to be displayed in the subtask list:
    function subtaskListItem({ item }) {
        return (
            <CardContainer style={{ paddingTop: 0 }}>
                <View style={[styles.colourStrip, { backgroundColor: item.task.colour }]} />
                <View style={styles.deadlineContainer}>
                    <Text>{"Due " + getDatePrompt(item.endDate) + " (Deadline: " + item.endDate + ")"}</Text>
                </View>
                <Text>{item.subtask.name}</Text>
                <Text>{item.task.name}</Text>
                <RowContainer style={styles.buttonRowContainer}>
                    <RectButton
                        title="Complete"
                        style={styles.button}
                        onPress={() => navigation.navigate("Subtask Complete", { taskIndex: item.taskIndex, subtaskIndex: item.subtaskIndex, })}
                    />
                    <RectButton
                        title="Edit"
                        style={styles.button}
                        onPress={() => navigation.navigate("Edit Subtask", { newSubtask: false, taskIndex: item.taskIndex, subtaskIndex: item.subtaskIndex })}
                    />
                </RowContainer>
            </CardContainer>
        );
    }

    // Returns an item to be displayed if there are no current subtasks:
    function emptyListItem() {
        return (
            <View style={{ alignItems: "center" }}>
                <Subheading>All Goals Completed!</Subheading>
            </View>
        );
    }

    return (
        <View>
            <ScrollView>
                <Heading style={{ margin: 10 }}>Your Goals for Today:</Heading>
                <CardContainer style={{ margin: 0, paddingHorizontal: 0, paddingTop: 15, paddingBottom: 20, }}>
                    <FlatList
                        data={currentSubtasks}
                        renderItem={subtaskListItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={emptyListItem}
                    />
                </CardContainer>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    colourStrip: {
        height: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginBottom: 2,
    },
    deadlineContainer: {
        alignItems: "center",
        paddingBottom: 2,
        marginBottom: 5,
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    buttonRowContainer: {
        marginTop: 10,
    },
    button: {
        marginHorizontal: 3,
    },
});