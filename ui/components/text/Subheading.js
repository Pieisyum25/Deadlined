import { Text } from "react-native";


export default function Subheading(props) {
    return (
        <Text style={[{ fontSize: 17 }, props.style]}>
            {props.children}
        </Text>
    );
}