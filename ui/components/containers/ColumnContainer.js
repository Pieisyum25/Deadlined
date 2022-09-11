import { StyleSheet, View } from "react-native";


// A view that arranges its children into a column:
export default function ColumnContainer(props) {
    return (
        <View style={[styles.columnContainer, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    columnContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
});