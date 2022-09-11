import { Text } from "react-native";


// Text with a big font size, used for consistency:
export default function Heading(props) {
    return (
        <Text style={[{ fontSize: 20 }, props.style]}>
            {props.children}
        </Text>
    );
}