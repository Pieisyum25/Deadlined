import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addSubtask, removeTask, selectTask, selectTaskSubtasks, updateTask } from "../../logic/StateViewModel";
import { createSubtask, createTask, stringToDate } from "../../logic/util";
import RectButton from "../components/buttons/RectButton"
import ColumnContainer from "../components/containers/ColumnContainer";
import InputContainer from "../components/containers/InputContainer";
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
    const [startDateText, onChangeStartDateText] = useState(task.startDate);
    const [endDate, onChangeEndDate] = useState(task.endDate);
    const [endDateText, onChangeEndDateText] = useState(task.endDate);
    const dispatch = useDispatch();

    function onSubmitStartDateTextInput() {
        const date = stringToDate(startDateText);
        if (date && date.getTime() <= stringToDate(endDate).getTime()) onChangeStartDate(startDateText);
        else onChangeStartDateText(startDate);
    }

    function onSubmitEndDateTextInput() {
        const date = stringToDate(endDateText);
        if (date && date.getTime() >= stringToDate(startDate).getTime()) onChangeEndDate(endDateText);
        else onChangeEndDateText(endDate);
    }

    function subtaskListItem(subtask) {
        const item = subtask.item;
        const opacity = (item.completed) ? 0.3 : 1.0;

        return (
            <View style={{ margin: 5 }}>
                <RowContainer style={styles.spacedRowContainer}>
                    <RowContainer>
                        <RectButton
                            title="Edit"
                            style={styles.buttonContainer}
                            onPress={() => navigation.navigate("Edit Subtask", { newSubtask: false, taskIndex: taskIndex, subtaskIndex: subtask.index })}
                        />
                        <ColumnContainer style={{ opacity: opacity, marginLeft: 5 }}>
                            <Text>{item.name}</Text>
                            <Text>{item.reward}</Text>
                        </ColumnContainer>
                    </RowContainer>
                    <View style={{ opacity: opacity }}>
                        <Text>Weight: {item.weight}</Text>
                    </View>
                </RowContainer>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={{ padding: 10 }}>
                    <InputContainer>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Task Name"
                        value={name}
                        onChangeText={onChangeName}
                    />
                    </InputContainer>
                    <InputContainer>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Task Reward"
                        value={reward}
                        onChangeText={onChangeReward}
                    />
                    </InputContainer>
                    <InputContainer>
                    <RowContainer>
                    <Dropdown
                        style={styles.dropdownMenu}
                        placeholder="Task Colour"
                        data={colors}
                        labelField="label"
                        valueField="value"
                        value={{ label: (colour.charAt(0).toUpperCase() + colour.slice(1)), value: colour }}
                        onChange={item => onChangeColour(item.value)}
                    />
                    <View style={[styles.colourSquare, { backgroundColor: colour }]} />
                    </RowContainer>
                    </InputContainer>
                    <InputContainer>
                    <RowContainer style={{ justifyContent: "space-between" }}>
                        <Text>Task Start Date:</Text>
                        <TextInput
                        style={styles.textInput}
                        placeholder="DD/MM/YY"
                        value={startDateText}
                        onChangeText={onChangeStartDateText}
                        onSubmitEditing={onSubmitStartDateTextInput}
                        onBlur={onSubmitStartDateTextInput}
                    />
                    </RowContainer>
                    </InputContainer>
                    <InputContainer>
                    <RowContainer style={{ justifyContent: "space-between" }}>
                        <Text>Task Deadline:</Text>
                        <TextInput
                        style={styles.textInput}
                        placeholder="DD/MM/YY"
                        value={endDateText}
                        onChangeText={onChangeEndDateText}
                        onSubmitEditing={onSubmitEndDateTextInput}
                        onBlur={onSubmitEndDateTextInput}
                    />
                    </RowContainer>
                    </InputContainer>

                    <View style={{ padding: 10 }}>
                        <View style={styles.subtasksHeadingContainer}>
                            <Text>Subtasks:</Text>
                        </View>
                        <FlatList
                            contentContainerStyle={styles.list}
                            data={subtasks}
                            renderItem={subtaskListItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <RectButton
                            title="Add Subtask"
                            style={styles.buttonContainer}
                            onPress={() => {
                                const subtaskIndex = subtasks.length;
                                dispatch(addSubtask({ taskIndex: taskIndex, subtask: createSubtask() }))
                                navigation.navigate("Edit Subtask", { newSubtask: true, taskIndex: taskIndex, subtaskIndex: subtaskIndex })
                            }}
                        />
                    </View>
                    {!newTask && <View style={{ paddingVertical: 5 }}>
                        <RectButton
                            title="Delete Task"
                            onPress={() => {
                                dispatch(removeTask({ taskIndex: taskIndex }))
                                navigation.goBack();
                            }}
                        />
                    </View>}
                </View>
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
        justifyContent: 'space-between',
    },
    textInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    dropdownMenu: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
    colourSquare: {
        width: 30,
        height: 30,
        marginLeft: 10,

        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
    },
    spacedRowContainer: {
        justifyContent: "space-between",
    },
    subtasksHeadingContainer: {
        paddingBottom: 3,
        marginBottom: 4,
        borderBottomColor: "black",
        borderBottomWidth: 2,
    },
    confirmationButtonContainer: {
        margin: 10,
    },
    confirmationButton: {
        margin: 5,
        flex: 1,
    },
});