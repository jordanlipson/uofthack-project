import * as React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const FlatButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9D9D9',
    },
    buttonText: {
        color: '#000000',
        fontSize: '18em',
        fontWeight: 'bold',
    }
})

export default FlatButton;