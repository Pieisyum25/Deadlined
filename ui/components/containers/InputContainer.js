import { StyleSheet, View } from "react-native";


// A view with padding for consistent styling of input components:
export default function InputContainer(props) {
    return (
        <View style={[styles.inputContainer, props.style]}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingVertical: 5,
    }
});