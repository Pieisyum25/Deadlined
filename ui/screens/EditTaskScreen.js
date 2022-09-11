import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addSubtask, removeTask, selectTask, selectTaskSubtasks, updateTask } from "../../logic/StateViewModel";
import { createSubtask, createTask } from "../../logic/util";
import RectButton from "../components/buttons/RectButton"
import ColumnContainer from "../components/containers/ColumnContainer";
import RowContainer from "../components/containers/RowContainer";


const colors = [
    { label: "White", value: "white" },
    { label: "Black", value: "black" },
    { label: "Red", value: "red" },
    { label: "Orange", value: "orange" },
    { label: "Yellow", value: "yellow" },
    { label: "Green", value: "green" },
    { label: "Blue", value: "blue" },
    { label: "Indigo", value: "indigo" },
    { label: "Purple", value: "purple" },
]


export default function EditTaskScreen({ route, navigation }) {

    const { newTask, taskIndex } = route.params;
    const task = useSelector(selectTask({ taskIndex: taskIndex }));
    const subtasks = useSelector(selectTaskSubtasks({ taskIndex: taskIndex }));
    const [name, onChangeName] = useState(newTask ? "" : task.name);
    const [reward, onChangeReward] = useState(newTask ? "" : task.reward);
    const [colour, onChangeColour] = useState(newTask ? "" : task.colour);
    const [startDate, onChangeStartDate] = useState(task.startDate);
    const [endDate, onChangeEndDate] = useState(task.endDate);
    const dispatch = useDispatch();

    function subtaskListItem(subtask) {
        const item = subtask.item;

        return (
            <View style={styles.itemContainer}>
                <RowContainer>
                    <RectButton
                        title="Edit"
                        style={styles.buttonContainer}
                        onPress={() => navigation.navigate("Edit Subtask", { newSubtask: false, taskIndex: taskIndex, subtaskIndex: subtask.index })}
                    />
                    <ColumnContainer>
                        <Text>{item.name}</Text>
                        <Text>{item.reward}</Text>
                    </ColumnContainer>
                    <Text>Weight: {item.weight}</Text>
                </RowContainer>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <ScrollView>
                <TextInput
                    style={styles.textInput}
                    placeholder="Task Name"
                    value={name}
                    onChangeText={onChangeName}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Task Reward"
                    value={reward}
                    onChangeText={onChangeReward}
                />
                <Dropdown
                    placeholder="Task Colour"
                    data={colors}
                    labelField="label"
                    valueField="value"
                    value={{ label: (colour.charAt(0).toUpperCase() + colour.slice(1)), value: colour }}
                    onChange={item => onChangeColour(item.value)}
                />
                <RowContainer style={{ justifyContent: "space-between" }}>
                    <Text>Task Start Date: {startDate}</Text>
                    <RectButton title="Cal"></RectButton>
                </RowContainer>
                <RowContainer style={{ justifyContent: "space-between" }}>
                    <Text>Task Deadline: {endDate}</Text>
                    <RectButton title="Cal"></RectButton>
                </RowContainer>

                <Text>Subtasks:</Text>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={subtasks}
                    renderItem={subtaskListItem}
                    keyExtractor={(item, index) => index.toString()}
                />

                <View style={styles.itemContainer}>
                    <RowContainer>
                        <RectButton
                            title="Add Subtask"
                            style={styles.buttonContainer}
                            onPress={() => {
                                const subtaskIndex = subtasks.length;
                                dispatch(addSubtask({ taskIndex: taskIndex, subtask: createSubtask() }))
                                navigation.navigate("Edit Subtask", { newSubtask: true, taskIndex: taskIndex, subtaskIndex: subtaskIndex })
                            }}
                        />
                    </RowContainer>
                </View>
                {!newTask && <RectButton
                    title="Delete Task"
                    onPress={() => {
                        dispatch(removeTask({ taskIndex: taskIndex }))
                        navigation.goBack();
                    }}
                />}
            </ScrollView>

            <RowContainer style={styles.confirmationButtonContainer}>
                <RectButton
                    title="Cancel"
                    style={styles.confirmationButton}
                    onPress={() => {
                        if (newTask) dispatch(removeTask({ taskIndex: taskIndex }));
                        navigation.goBack();
                    }}
                />
                <RectButton
                    title={newTask ? "Add" : "Save"}
                    style={styles.confirmationButton}
                    onPress={() => {
                        const task = createTask(name, reward, colour, startDate, endDate, subtasks);
                        dispatch(updateTask({ taskIndex: taskIndex, task: task }));
                        navigation.goBack();
                    }}
                />
            </RowContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    textInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    confirmationButtonContainer: {
        margin: 10,
    },
    confirmationButton: {
        margin: 5,
        flex: 1,
    },
});