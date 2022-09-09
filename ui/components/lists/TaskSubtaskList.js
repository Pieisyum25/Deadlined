import { selectTaskSubtasks } from "../../../tasksSlice";
import ColumnContainer from "../containers/ColumnContainer";
import RowContainer from "../containers/RowContainer";


export default function TaskSubtaskList({ navigation, taskIndex }) {
    const subtasks = useSelector(selectTaskSubtasks({ taskIndex: taskIndex }));

    function renderItem({ item }) {
        return (
            <View>
                <RowContainer>
                    <ColumnContainer>
                        <Text>Subtask Name</Text>
                        <Text>Reward Description</Text>
                    </ColumnContainer>
                    <Text>Weight: 1.0</Text>
                </RowContainer>
            </View>
        );
    }

    return (
        <View style={styles.listContainer}>
            <FlatList
                contentContainerStyle={styles.list}
                data={subtasks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            <View>Add New Subtask</View>
        </View>
    );
}