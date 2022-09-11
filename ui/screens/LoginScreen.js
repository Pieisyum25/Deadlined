import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../../api/firebase'
import { login, register } from '../../logic/AuthenticationViewModel'
import { initDatabase } from '../../logic/DatabaseViewModel'
import RectButton from '../components/buttons/RectButton'
import Heading from '../components/text/Heading'


// LoginScreen allows the user login or register via an email and password:
export default function LoginScreen({ navigation }) {

    // Credential state:
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // An effect that initialises the user's data and gives access to the rest of the app once the user
    // has registered or logged in:
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                initDatabase();
                navigation.replace("Main");
            }
        });
        return unsubscribe;
    }, []);


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="height"
        >
            <View style={{ paddingHorizontal: 50, paddingVertical: 10, margin: 30, borderBottomColor: "black", borderBottomWidth: 2, }}>
                <Heading>Deadlined</Heading>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <RectButton
                    style={styles.button}
                    title="Login"
                    onPress={() => login(email, password)}
                />
                <RectButton
                    style={styles.button}
                    title="Register"
                    onPress={() => register(email, password)}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        marginTop: 40,
    },
    button: {
        flex: 1,
        margin: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    }
})