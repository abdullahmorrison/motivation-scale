import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';

export default function ScaleModal() {
    return (
        <View style={styles.background}>
            <View style={styles.modal}>
                <View>
                    <View>
                        <Text style={styles.modal.inputLabel}>Goal</Text>
                        <TextInput style={styles.modal.textInput} placeholder="Ex: Learn a new language"/>
                    </View>
                    <View>
                        <Text style={styles.modal.inputLabel}>Chasing Sucess</Text>
                        <TextInput multiline={true} style={[styles.modal.textInput, styles.modal.textArea]} placeholder="I feel like I'm making good progress when..."/>
                    </View>
                    <View>
                        <Text style={styles.modal.inputLabel}>Avoiding Failure</Text>
                        <TextInput multiline={true} style={[styles.modal.textInput, styles.modal.textArea]} placeholder="I feel like I'm falling behind when..."/>
                    </View>
                </View>
                <View style={styles.modal.buttons}>
                    <TouchableOpacity style={[styles.button, styles.button.cancel]}>
                        <Text style={styles.button.text}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.button.create]}>
                        <Text style={styles.button.text}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',

        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
    },
    modal: {
        width: '100%',
        minHeight: '60%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 3,
        justifyContent: 'space-evenly',
        padding: 10,

        inputLabel: {
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 5,
        } as const,
        textInput: {
            borderColor: 'grey',
            borderWidth: 0.5,
            borderRadius: 5,
            padding: 5,
            marginBottom: 10,
        },
        textArea: {
            height: 100,
            textAlignVertical: 'top',
        } as const,

        buttons: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        } as const
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 5,
        elevation: 3,
        padding: 8,
        width: '40%',

        text: {
            fontWeight: 'bold',
        } as const,
        cancel: {
            backgroundColor: '#D6D6D6',
        },
        create: {
            backgroundColor: '#33EC46',
        }
    } 
})