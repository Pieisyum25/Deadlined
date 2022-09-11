import { Pressable, StyleSheet, Text } from "react-native";


// A button that mimics the Floating Action Button commonly used on Android:
export default function FloatingActionButton(props) {
    return (
        <Pressable style={styles.container} onPress={props.onPress}>
            <Text style={styles.title}>{props.title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: 56,
        borderRadius: 28,
        paddingBottom: 3,

        position: "absolute",
        bottom: 30,
        right: 20,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#0055FF",

        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 28,
        elevation: 10,
    },

    title: {
        fontSize: 25,
        color: "white",
    },
});