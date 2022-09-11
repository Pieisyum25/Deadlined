import { View, Text, StyleSheet } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, selectTask } from "../../logic/StateViewModel";

import RectButton from "../components/buttons/RectButton"
import RowContainer from "../components/containers/RowContainer";
import Heading from "../components/text/Heading";


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
        <View style={styles.screen}>
            <ScrollView>
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Incredible! You've completed:</Text>
                    <View style={styles.message}>
                        <Heading>{task.name}</Heading>
                        <View style={styles.listContainer}>
                            <FlatList
                                contentContainerStyle={styles.list}
                                data={task.subtasks}
                                renderItem={subtaskListItem}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                    <Text style={styles.message}>You've definitely earned:</Text>
                    <Heading style={styles.message}>{task.reward}</Heading>
                </View>
                <View style={styles.congratulationContainer}>
                    <Heading>Great job!</Heading>
                </View>
            </ScrollView>

            <RowContainer style={styles.confirmationButtonContainer}>
                <RectButton style={styles.confirmationButton} title="Cancel" onPress={() => navigation.goBack()} />
                <RectButton
                    style={styles.confirmationButton}
                    title="Done"
                    onPress={() => {
                        dispatch(removeTask({ taskIndex: taskIndex }));
                        navigation.goBack();
                    }}
                />
            </RowContainer>
        </View>
    )
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