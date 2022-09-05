import { StyleSheet, View } from "react-native";


export default function InputContainer(props) {
    return (
        <View style={[styles.inputContainer, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 10,
        marginHorizontal: 10
    }
});