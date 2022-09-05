import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import RectButton from "../components/buttons/RectButton"
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

export default function NewTaskScreen({ navigation }) {

    const [taskName, onChangeTaskName] = useState("");
    const [taskReward, onChangeTaskReward] = useState("");
    const [taskColour, onChangeTaskColour] = useState("white");

    return (
        <View style={styles.screen}>
            <ScrollView>
                <InputContainer>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Task Name"
                        onChangeText={onChangeTaskName}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Task Reward"
                        onChangeText={onChangeTaskReward}
                    />
                </InputContainer>

                <InputContainer>
                    <Dropdown
                        placeholder="Task Colour"
                        data={colors}
                        labelField="label"
                        valueField="value"
                        onChange={item => onChangeTaskColour(item.value)}
                    />
                </InputContainer>

                <InputContainer>
                    <RowContainer style={{ justifyContent: "space-between" }}>
                        <Text>Task Start Date: DD/MM/YYYY</Text>
                        <RectButton title="Cal"></RectButton>
                    </RowContainer>
                </InputContainer>

                <InputContainer>
                    <RowContainer style={{ justifyContent: "space-between" }}>
                        <Text>Task Deadline: DD/MM/YYYY</Text>
                        <RectButton title="Cal"></RectButton>
                    </RowContainer>
                </InputContainer>

                <Text>Subtasks:</Text>
                

            </ScrollView>

            <RowContainer style={styles.confirmationButtonContainer}>
                <RectButton
                    title="Cancel"
                    style={styles.confirmationButton}
                    onPress={() => navigation.navigate("Tasks")}
                />
                <RectButton
                    title="Add"
                    style={styles.confirmationButton}
                    onPress={() => navigation.navigate("Tasks")}
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