import { StyleSheet, View } from "react-native";


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