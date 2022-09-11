import Slider from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { View } from "react-native-web";
import { useDispatch, useSelector } from "react-redux";
import { removeSubtask, selectTaskSubtask, updateSubtask } from "../../logic/StateViewModel";
import { createSubtask } from "../../logic/util";
import RectButton from "../components/buttons/RectButton";
import RowContainer from "../components/containers/RowContainer";


export default function EditSubtaskScreen({ route, navigation }) {

    const { newSubtask, taskIndex, subtaskIndex } = route.params;
    const subtask = useSelector(selectTaskSubtask({ taskIndex: taskIndex, subtaskIndex: subtaskIndex }));
    const [name, onChangeName] = useState((newSubtask) ? "" : subtask.name);
    const [reward, onChangeReward] = useState((newSubtask) ? "" : subtask.reward);
    const [weight, onChangeWeight] = useState(subtask.weight);
    const [weightText, onChangeWeightText] = useState("" + subtask.weight);
    const dispatch = useDispatch();

    function onChangeWeightTextInput(text) {
        onChangeWeightText(text);
    }

    function onChangeWeightTextInputSubmit() {
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

    function onChangeWeightSlider(value) {
        onChangeWeight(value);
        onChangeWeightText(value);
    }

    return (
        <View style={styles.screen}>
            <ScrollView>
                <TextInput
                    style={styles.textInput}
                    placeholder="Subtask Name"
                    value={name}
                    onChangeText={onChangeName}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Subtask Reward"
                    value={reward}
                    onChangeText={onChangeReward}
                />
                <RowContainer>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Weight"
                        value={weightText}
                        keyboardType="numeric"
                        onChangeText={text => onChangeWeightTextInput(text)}
                        onSubmitEditing={onChangeWeightTextInputSubmit}
                        onBlur={onChangeWeightTextInputSubmit}
                    />
                    <Text>0.1</Text>
                    <Slider
                        minimumValue={0.1}
                        maximumValue={10}
                        step={0.1}
                        value={weight}
                        onValueChange={value => onChangeWeightSlider(value)}
                    />
                    <Text>10</Text>
                </RowContainer>

                {!newSubtask && <RectButton
                    title="Delete Subtask"
                    onPress={() => {
                        dispatch(removeSubtask({ taskIndex: taskIndex, subtaskIndex: subtaskIndex }))
                        navigation.goBack();
                    }}
                />}
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
                        const updatedSubtask = createSubtask(name, reward, weight, subtask.completed);
                        dispatch(updateSubtask({ taskIndex: taskIndex, subtaskIndex: subtaskIndex, subtask: updatedSubtask }));
                        navigation.goBack();
                    }}
                />
            </RowContainer>
        </View>
    );
}

const styles = StyleSheet.create({

});