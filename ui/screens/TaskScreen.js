import { View, Text, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addTask, selectCurrentSubtask, selectTasks } from "../../logic/StateViewModel";
import { createTask, getDatePrompt, getSubtaskDays } from "../../logic/util";
import FloatingActionButton from "../components/buttons/FloatingActionButton";
import RectButton from "../components/buttons/RectButton";
import CardContainer from "../components/containers/CardContainer";
import RowContainer from "../components/containers/RowContainer";


export default function TaskScreen({ navigation }) {
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();

    function TaskItem({ task }) {
        const currSubtask = useSelector(selectCurrentSubtask({ taskIndex: task.index }));
        const subtaskDays = getSubtaskDays(task.item);

        function SubtaskItem({ subtask }) {
            const days = subtaskDays[subtask.index];
            const opacity = (subtask.item.completed) ? 0.3 : 1.0;

            return (
                <View>
                    <RowContainer style={[styles.spacedRowContainer, { opacity: opacity }]}>
                        <Text>{subtask.item.name}</Text>
                        <Text>{subtask.item.weight} ({days + " " + (days == 1 ? "Day" : "Days")})</Text>
                    </RowContainer>
                </View>
            );
        }

        return (
            <CardContainer style={{ paddingLeft: 0, paddingTop: 0 }}>
                <RowContainer style={{ alignItems: "stretch" }}>
                    <View style={[styles.colourStrip, { backgroundColor: task.item.colour }]} />
                    <View style={{ flex: 1, paddingTop: 3 }}>
                        <View style={styles.taskNameContainer}>
                            <Text>{task.item.name}</Text>
                        </View>
                        <Text>{"Start: " + getDatePrompt(task.item.startDate) + "   (" + task.item.startDate + ")"}</Text>
                        <Text>{"Deadline: " + getDatePrompt(task.item.endDate) + "   (" + task.item.endDate + ")"}</Text>
                        {task.item.subtasks.length > 0 && <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                            <RowContainer style={styles.subtaskListHeadingContainer}>
                                <Text>Subtask:</Text>
                                <Text>Weight:</Text>
                            </RowContainer>
                            <FlatList
                                data={task.item.subtasks}
                                renderItem={item => <SubtaskItem subtask={item} />}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>}
                        <RowContainer style={styles.buttonRowContainer}>
                            {currSubtask && <RectButton
                                title="Complete Subtask"
                                style={styles.button}
                                onPress={() => navigation.navigate("Subtask Complete", { taskIndex: task.index, subtaskIndex: currSubtask.index })}
                            />}
                            <RectButton
                                title="Edit"
                                style={styles.button}
                                onPress={() => navigation.navigate("Edit Task", { newTask: false, taskIndex: task.index })}
                            />
                        </RowContainer>
                    </View>
                </RowContainer>
            </CardContainer>
        );
    }

    return (
        <View style={{ height: '100%' }}>
            <ScrollView>
                <CardContainer style={{ margin: 0, paddingHorizontal: 0, paddingTop: 15, paddingBottom: 30, }}>
                    <FlatList
                        data={tasks}
                        renderItem={item => <TaskItem task={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </CardContainer>
            </ScrollView>
            <FloatingActionButton
                title="+"
                onPress={() => {
                    const taskIndex = tasks.length;
                    dispatch(addTask({ task: createTask() }));
                    navigation.navigate("Edit Task", { newTask: true, taskIndex: taskIndex });
                }}
            />
        </View>
    )
};




const styles = StyleSheet.create({
    colourStrip: {
        width: 10,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        marginRight: 5,
        marginTop: 8,
    },
    taskNameContainer: {
        paddingLeft: 5,
        paddingBottom: 2,
        marginBottom: 5,
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    subtaskListHeadingContainer: {
        justifyContent: "space-between",
        paddingBottom: 2,
        marginBottom: 4,
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    spacedRowContainer: {
        justifyContent: "space-between",
    },
    buttonRowContainer: {
        marginTop: 10,
    },
    button: {
        marginHorizontal: 3,
    },
});