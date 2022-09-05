import { StyleSheet, View } from "react-native";


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