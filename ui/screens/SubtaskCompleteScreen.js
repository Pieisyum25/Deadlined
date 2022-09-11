import produce from "immer";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import store from "../../api/store";
import { selectTaskSubtask, updateSubtask } from "../../logic/StateViewModel";

import RectButton from "../components/buttons/RectButton"
import RowContainer from "../components/containers/RowContainer";


export default function SubtaskCompleteScreen({ route, navigation }) {

    const { taskIndex, subtaskIndex } = route.params;
    const subtask = useSelector(selectTaskSubtask({ taskIndex: taskIndex, subtaskIndex: subtaskIndex, }));
    const dispatch = useDispatch();

    return (
        <View>
            <ScrollView>
                <Text>Wow! I see you've completed:</Text>
                <Text>{subtask.name}</Text>
                <Text>I feel like you've earned:</Text>
                <Text>{subtask.reward}</Text>
                <Text>Well done!</Text>
                <RowContainer>
                    <RectButton title="Cancel" onPress={() => navigation.goBack()} />
                    <RectButton
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
            </ScrollView>
        </View>
    )
}