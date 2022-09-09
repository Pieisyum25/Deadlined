import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTasks } from '../../../tasksSlice';
import { Colors, Metrics } from '../../styles';
import RectButton from '../buttons/RectButton';
import RowContainer from '../containers/RowContainer';


export default function TaskList({ navigation }) {
    const tasks = useSelector(selectTasks);

    function renderItem({ item }) {
        return (
            <View style={styles.itemContainer}>
                <RowContainer style={{ alignItems: "stretch" }}>
                    <View style={{ width: 10, backgroundColor: item.colour }}/>
                    <View style={{ flex: 1 }}>
                        <Text>{item.name}</Text>
                        <Text>{"Start: " + getDatePrompt(item.startDate) + "   (" + item.startDate + ")"}</Text>
                        <Text>{"Deadline: " + getDatePrompt(item.endDate) + "   (" + item.endDate + ")"}</Text>
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
                </RowContainer>

            </View>
        );
    }

    return (
        <View style={styles.listContainer}>
            <FlatList
                contentContainerStyle={styles.list}
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

function getDatePrompt(keyDateString) {
    const keyDate = stringToDate(keyDateString);
    const currDate = new Date();
    let days = Math.floor((keyDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));

    let prompt = "In " + days + " Days";
    if (days == 0) {
        prompt = "Today"
    }
    else if (days < 0) {
        days = Math.abs(days);
        prompt = days + " Days Ago"
    }
    return prompt
}


function stringToDate(dateString) {
    const tokens = dateString.split('/');
    return new Date("20" + tokens[2] + "/" + tokens[1] + "/" + tokens[0]);
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