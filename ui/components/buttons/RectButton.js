import { Button, StyleSheet } from 'react-native';

import { Colors } from '../../styles/index'


export default function (props) {
    return (
        <Button
        style={styles.default}
        title={props.title} 
        onPress={props.onPress} 
        />
    )
}

const styles = StyleSheet.create({
    default: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.DARK
    }
});