import React, { useEffect } from 'react';
import { BackHandler, View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';


interface ScaleModalProps {
    isModalOpen: Boolean,
    closeModal: () => void
}
export default function ScaleModal(props: ScaleModalProps) {
    const handleBackButton = () => {
        props.closeModal()
        return true
    }
    useEffect(() => { // close modal on back button press
        BackHandler.addEventListener('hardwareBackPress', handleBackButton)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
        }
    }, [])
    return (
        <View 
        onTouchStart={
            (event)=>{event.preventDefault() 
            if(event.target == event.currentTarget) props.closeModal()
        }} style={[styles.background, props.isModalOpen ? undefined : styles.hidden]}>
            <View style={styles.modal}>
                <View>
                    <View>
                        <Text style={styles.modal.inputLabel.title}>Goal</Text>
                        <TextInput style={styles.modal.textInput} placeholder="Ex: Learn a new language"/>
                    </View>
                    <View>
                        <View style={styles.modal.inputLabel}>
                            <Text style={styles.modal.inputLabel.title}>Chasing Sucess</Text>
                            <TouchableOpacity>
                                <FontAwesomeIcon icon={faCircleInfo} size={18}/>
                            </TouchableOpacity>
                        </View>
                        <TextInput multiline={true} style={[styles.modal.textInput, styles.modal.textArea]} placeholder="I feel like I'm making good progress when..."/>
                    </View>
                    <View>
                        <View style={styles.modal.inputLabel}>
                            <Text style={styles.modal.inputLabel.title}>Avoiding Failure</Text>
                            <TouchableOpacity>
                                <FontAwesomeIcon icon={faCircleInfo} size={18}/>
                            </TouchableOpacity>
                        </View>
                        <TextInput multiline={true} style={[styles.modal.textInput, styles.modal.textArea]} placeholder="I feel like I'm falling behind when..."/>
                    </View>
                </View>
                <View style={styles.modal.buttons}>
                    <TouchableOpacity onPress={props.closeModal} style={[styles.button, styles.button.cancel]}>
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
    hidden: {
        display: 'none',
    },
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
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,

            title: {
                fontWeight: 'bold',
                fontSize: 18,
            }
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