import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../styles";


export default function FloatingActionButton(props) {
    return (
        <Pressable style={styles.container} onPress={props.onPress}>
            <Text style={styles.title}>{props.title}</Text>
        </Pressable>
    );
};
  
const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        paddingBottom: 3,

        position: "absolute",
        bottom: 40,
        right: 30,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: Colors.HIGHLIGHT,
    },
    title: {
        fontSize: 25,
        color: "#fff",
    },
});