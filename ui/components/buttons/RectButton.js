import { Button, View } from 'react-native';

// A black rectangular button:
export default function (props) {
    return (
        <View style={props.style}>
            <Button
                color="black"
                title={props.title}
                onPress={props.onPress}
            />
        </View>
    );
}