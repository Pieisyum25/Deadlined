import produce from "immer";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import store from "../../api/store";
import { selectTaskSubtask, updateSubtask } from "../../logic/StateViewModel";
import RectButton from "../components/buttons/RectButton"
import RowContainer from "../components/containers/RowContainer";
import Heading from "../components/text/Heading";


// SubtaskCompleteScreen congratulates the user for completing a subtask:
export default function SubtaskCompleteScreen({ route, navigation }) {

    // Subtask properties and state:
    const { taskIndex, subtaskIndex } = route.params;
    const subtask = useSelector(selectTaskSubtask({ taskIndex: taskIndex, subtaskIndex: subtaskIndex, }));
    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Wow! I see you've completed:</Text>
                    <Heading style={styles.message}>{subtask.name}</Heading>
                    <Text style={styles.message}>I feel like you've earned:</Text>
                    <Heading style={styles.message}>{subtask.reward}</Heading>
                </View>
                <View style={styles.congratulationContainer}>
                    <Heading>Well done!</Heading>
                </View>
            </ScrollView>

            <RowContainer style={styles.confirmationButtonContainer}>
                <RectButton style={styles.confirmationButton} title="Cancel" onPress={() => navigation.goBack()} />
                <RectButton
                    style={styles.confirmationButton}
                    title="Done"
                    onPress={() => {
                        const completedSubtask = produce(subtask, draft => { draft.completed = true; });
                        dispatch(updateSubtask({ taskIndex: taskIndex, subtaskIndex: subtaskIndex, subtask: completedSubtask }));
                        navigation.goBack();
                        if (store.getState().tasks[taskIndex].subtasks.length - 1 == subtaskIndex) {
                            navigation.navigate("Task Complete", { taskIndex: taskIndex });
                        }
                    }}
                />
            </RowContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
    },
    messageContainer: {
        padding: 20,
    },
    message: {
        marginBottom: 10,
    },
    congratulationContainer: {
        alignItems: "center",
        paddingBottom: 20,
    },
    confirmationButtonContainer: {
        margin: 10,
    },
    confirmationButton: {
        margin: 5,
        flex: 1,
    },
});