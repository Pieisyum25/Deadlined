import { View, Text, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, selectTask } from "../../logic/StateViewModel";

import RectButton from "../components/buttons/RectButton"
import RowContainer from "../components/containers/RowContainer";


export default function TaskCompleteScreen({ route, navigation }) {

    const { taskIndex } = route.params;
    const task = useSelector(selectTask({ taskIndex: taskIndex }));
    const dispatch = useDispatch();

    function subtaskListItem({ item }) {
        return (
            <View style={styles.itemContainer}>
                <Text>- {item.name}</Text>
            </View>
        );
    }

    return (
        <View>
            <ScrollView>
                <Text>Incredible! You've completed:</Text>
                <Text>{task.name}</Text>
                <View style={styles.listContainer}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={task.subtasks}
                        renderItem={subtaskListItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <Text>You've definitely earned:</Text>
                <Text>{task.reward}</Text>
                <Text>Great job!</Text>
                <RowContainer>
                    <RectButton
                        title="Done"
                        onPress={() => {
                            dispatch(removeTask({ taskIndex: taskIndex }));
                            navigation.goBack();
                        }}
                    />
                </RowContainer>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

});