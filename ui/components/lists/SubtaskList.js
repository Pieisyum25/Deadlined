import { View, FlatList, Text } from 'react-native';

import RectButton from '../buttons/RectButton';


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
            <View>
                <Text>{item.subtaskName}</Text>
                <Text>{item.taskName}</Text>
                <RectButton title="Complete" onPress={() => navigation.navigate("Subtask Complete")} />
            </View>
        );
    }

    return (
        <View>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
        
    );
}