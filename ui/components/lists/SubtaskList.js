import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Colors, Metrics } from '../../styles';
import RectButton from '../buttons/RectButton';
import RowContainer from '../containers/RowContainer';


const DATA = [
    {
        id: "1",
        subtaskName: "Subtask Name",
        taskName: "Task Name",
        deadline: "DD/MM/YY",
        daysLeft: 5
    },
    {
        id: "2",
        subtaskName: "Subtask Name",
        taskName: "Task Name",
        deadline: "DD/MM/YY",
        daysLeft: 5
    },
    {
        id: "3",
        subtaskName: "Subtask Name",
        taskName: "Task Name",
        deadline: "DD/MM/YY",
        daysLeft: 5
    },
];

export default function SubtaskList({ navigation }) {
    function renderItem({ item }) {
        return (
            <View style={styles.itemContainer}>
                <Text>{item.daysLeft + " Days Left (Deadline: " + item.deadline + ")"}</Text>
                <Text>{item.subtaskName}</Text>
                <Text>{item.taskName}</Text>
                <RowContainer>
                    <RectButton
                        title="Complete"
                        style={styles.buttonContainer}
                        onPress={() => navigation.navigate("Subtask Complete")}
                    />
                    <RectButton
                        title="Edit" 
                        style={styles.buttonContainer}
                    />
                </RowContainer>
            </View>
        );
    }

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: Metrics.WINDOW_WIDTH * 0.05,
        marginBottom: 10,
        padding: 10,
        
        borderColor: Colors.DARK,
        borderRadius: 10,
        borderWidth: 2,
    },

    buttonContainer: {
        marginHorizontal: 3,
    },

    listContainer: {
        paddingTop: 15,
        paddingBottom: 10,

        borderColor: Colors.DARK,
        borderRadius: 10,
        borderWidth: 2,
    }
});