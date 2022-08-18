import { useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import RectButton from "../components/buttons/RectButton"
import RowContainer from "../components/containers/RowContainer";


const colors = [
    {label: "White", value: "white"},
    {label: "Black", value: "black"},
    {label: "Red", value: "red"},
    {label: "Orange", value: "orange"},
    {label: "Yellow", value: "yellow"},
    {label: "Green", value: "green"},
    {label: "Blue", value: "blue"},
    {label: "Indigo", value: "indigo"},
    {label: "Purple", value: "purple"},
]

export default function NewTaskScreen({ navigation }) {

    const [taskName, onChangeTaskName] = useState("");
    const [taskReward, onChangeTaskReward] = useState("");
    const [taskColour, onChangeTaskColour] = useState("white");

    function renderLabel() {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    }

    return (
        <View>
            <ScrollView style={{ minHeight: '100%' }}>
                <TextInput
                    placeholder="Task Name"
                    onChangeText={onChangeTaskName}
                />
                <TextInput
                    placeholder="Task Reward"
                    onChangeText={onChangeTaskReward}
                />
                <Dropdown
                    placeholder="Task Colour"
                    data={colors}
                    labelField="label"
                    valueField="value"
                    onChange={item => onChangeTaskColour(item.value)}
                />
                <RowContainer style={{ justifyContent: "space-between" }}>
                    <Text>Task Start Date: DD/MM/YYYY</Text>
                    <RectButton title="Cal"></RectButton>
                </RowContainer>
                <RowContainer style={{ justifyContent: "space-between" }}>
                    <Text>Task Deadline: DD/MM/YYYY</Text>
                    <RectButton title="Cal"></RectButton>
                </RowContainer>                
            </ScrollView>
            <RowContainer style={{ position: "absolute", bottom: 0, flexGrow: 1, margin: 10 }}>
                <RectButton
                    title="Cancel"
                    style={{ flex: 1, margin: 5 }}
                    onPress={() => navigation.navigate("Tasks")} 
                />
                <RectButton 
                    title="Add" 
                    style={{ flex: 1, margin: 5 }}
                    onPress={() => navigation.navigate("Tasks")} 
                />
            </RowContainer>
        </View>
    );
}