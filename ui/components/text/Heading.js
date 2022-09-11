import { Text } from "react-native";


export default function Heading(props) {
    return (
        <Text style={[{ fontSize: 20 }, props.style]}>
            {props.children}
        </Text>
    );
}