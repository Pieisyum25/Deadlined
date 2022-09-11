import Slider from "@react-native-community/slider";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { View } from "react-native-web";
import { useDispatch, useSelector } from "react-redux";
import { removeSubtask, selectTaskSubtask, updateSubtask } from "../../logic/StateViewModel";
import { createSubtask } from "../../logic/util";
import RectButton from "../components/buttons/RectButton";
import InputContainer from "../components/containers/InputContainer";
import RowContainer from "../components/containers/RowContainer";


// EditSubtaskScreen for editing the properties of the selected subtask:
export default function EditSubtaskScreen({ route, navigation }) {

    // Subtask properties and state:
    const { newSubtask, taskIndex, subtaskIndex } = route.params;
    const subtask = useSelector(selectTaskSubtask({ taskIndex: taskIndex, subtaskIndex: subtaskIndex }));
    const [name, onChangeName] = useState((newSubtask) ? "" : subtask.name);
    const [reward, onChangeReward] = useState((newSubtask) ? "" : subtask.reward);
    const [weight, onChangeWeight] = useState(subtask.weight);
    const [weightText, onChangeWeightText] = useState("" + subtask.weight);
    const [completed, onChangeCompleted] = useState(subtask.completed);
    const dispatch = useDispatch();

    // Ensures the weight entered via the TextInput is valid before setting it:
    function onSubmitWeightTextInput() {
        let value = parseFloat(weightText);
        if (isNaN(value)) {
            onChangeWeightText("" + weight);
            return;
        }
        value = Math.min(Math.max(value, 0.1), 10.0);
        value = Math.round(value * 10) / 10;
        onChangeWeight(value);
        onChangeWeightText("" + value);
    }

    // Updates the current weight and text in the TextInput to the slider's value:
    function onChangeWeightSlider(value) {
        onChangeWeight(value);
        onChangeWeightText(value);
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={{ padding: 10 }}>
                    <InputContainer>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Subtask Name"
                        value={name}
                        onChangeText={onChangeName}
                    />
                    </InputContainer>
                    <InputContainer>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Subtask Reward"
                        value={reward}
                        onChangeText={onChangeReward}
                    />
                    </InputContainer>
                    <InputContainer>
                    <RowContainer style={styles.spacedRowContainer}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Weight"
                                value={weightText}
                                keyboardType="numeric"
                                onChangeText={onChangeWeightText}
                                onSubmitEditing={onSubmitWeightTextInput}
                                onBlur={onSubmitWeightTextInput}
                            />
                        </View>
                        <RowContainer style={{ flex: 1 }}>
                            <Text style={{ margin: 3 }}>0.1</Text>
                            <Slider
                                minimumValue={0.1}
                                maximumValue={10}
                                step={0.1}
                                minimumTrackTintColor="#0055FF"
                                thumbTintColor="#0055FF"
                                value={weight}
                                onValueChange={value => onChangeWeightSlider(value)}
                            />
                            <Text style={{ margin: 3 }}>10</Text>
                        </RowContainer>
                    </RowContainer>
                    </InputContainer>
                    <InputContainer>
                    <RowContainer style={styles.spacedRowContainer}>
                        <View style={{ flex: 1 }}>
                            <Text>Completed:</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Checkbox
                                value={completed}
                                color="#0055FF"
                                onChange={() => onChangeCompleted(!completed)}
                            />
                        </View>
                    </RowContainer>
                    </InputContainer>

                    {!newSubtask && <View style={{ paddingVertical: 5 }}>
                        <RectButton
                            title="Delete Subtask"
                            onPress={() => {
                                dispatch(removeSubtask({ taskIndex: taskIndex, subtaskIndex: subtaskIndex }))
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
                        if (newSubtask) dispatch(removeSubtask({ taskIndex: taskIndex, subtaskIndex: subtaskIndex }));
                        navigation.goBack();
                    }}
                />
                <RectButton
                    title={newSubtask ? "Add" : "Save"}
                    style={styles.confirmationButton}
                    onPress={() => {
                        const updatedSubtask = createSubtask(name, reward, weight, completed);
                        dispatch(updateSubtask({ taskIndex: taskIndex, subtaskIndex: subtaskIndex, subtask: updatedSubtask }));
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
    spacedRowContainer: {
        justifyContent: "space-between",
    },
    confirmationButtonContainer: {
        margin: 10,
    },
    confirmationButton: {
        margin: 5,
        flex: 1,
    },
});