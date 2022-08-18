import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Colors, Metrics } from '../../styles';
import RectButton from '../buttons/RectButton';
import RowContainer from '../containers/RowContainer';


const DATA = [
    {
        id: "1",
        taskName: "Task Name",
        start: "DD/MM/YY",
        daysUntilStart: 5,
        deadline: "DD/MM/YY",
        daysUntilDeadline: 11,
    },
    {
        id: "2",
        taskName: "Task Name",
        start: "DD/MM/YY",
        daysUntilStart: -5,
        deadline: "DD/MM/YY",
        daysUntilDeadline: 6,
    },
    {
        id: "3",
        taskName: "Task Name",
        start: "DD/MM/YY",
        daysUntilStart: 5,
        deadline: "DD/MM/YY",
        daysUntilDeadline: 11,
    },
    {
        id: "4",
        taskName: "Task Name",
        start: "DD/MM/YY",
        daysUntilStart: -5,
        deadline: "DD/MM/YY",
        daysUntilDeadline: 6,
    },
    {
        id: "5",
        taskName: "Task Name",
        start: "DD/MM/YY",
        daysUntilStart: 5,
        deadline: "DD/MM/YY",
        daysUntilDeadline: 11,
    },
    {
        id: "6",
        taskName: "Task Name",
        start: "DD/MM/YY",
        daysUntilStart: -5,
        deadline: "DD/MM/YY",
        daysUntilDeadline: 6,
    },
];

export default function TaskList({ navigation }) {
    function renderItem({ item }) {
        let startDays = item.daysUntilStart;
        let startDaysPrompt = "In " + startDays + " Days";
        if (startDays < 0) {
            startDays = Math.abs(startDays);
            startDaysPrompt = startDays + " Days Ago"
        }
        return (
            <View style={styles.itemContainer}>
                <Text>{item.taskName}</Text>
                <Text>{"Start: " + startDaysPrompt + "   (" + item.start + ")"}</Text>
                <Text>{"Deadline: In " + item.daysUntilDeadline + " Days   (" + item.deadline + ")"}</Text>
                <RowContainer>
                    <RectButton
                        title="Complete Subtask"
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
                contentContainerStyle={styles.list}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginHorizontal: '10%',
        marginBottom: 10,
        padding: 10,

        borderColor: Colors.DARK,
        borderRadius: 10,
        borderWidth: 2,
    },

    buttonContainer: {
        marginHorizontal: 3,
    },

    list: {
        paddingTop: 15,
        paddingBottom: 50,
    },

    listContainer: {
        borderColor: Colors.DARK,
        borderRadius: 10,
        borderWidth: 2,
    }
});