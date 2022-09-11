import { Text } from "react-native";


// Text with a big-ish font size, used for consistency:
export default function Subheading(props) {
    return (
        <Text style={[{ fontSize: 17 }, props.style]}>
            {props.children}
        </Text>
    );
}