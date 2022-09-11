import { StyleSheet, View } from "react-native";


// A view that arranges its children into a row:
export default function RowContainer(props) {
    return (
        <View style={[styles.rowContainer, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    }
});