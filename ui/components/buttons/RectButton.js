import { Button, StyleSheet, View } from 'react-native';
import { Colors } from '../../styles/index'


export default function (props) {
    return (
        <View style={props.style}>
            <Button
                color={Colors.DARK}
                title={props.title}
                onPress={props.onPress}
            />
        </View>
    );
}