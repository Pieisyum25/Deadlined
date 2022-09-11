import { Button, View } from 'react-native';


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