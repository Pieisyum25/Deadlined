import { StyleSheet, View } from "react-native";


// A view that mimics a CardView commonly used in Android:
export default function CardContainer(props) {
    return (
        <View style={[styles.cardContainer, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 10,

        borderColor: "black",
        borderRadius: 10,
        borderWidth: 2,
    }
});