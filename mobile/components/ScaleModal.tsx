import React, { useState, useEffect, useCallback } from 'react';
import { BackHandler, View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@rneui/base';
import { ScaleType } from './Scale';
import { useMutation, gql } from '@apollo/client';

interface ScaleModalProps {
    scaleToEdit: Partial<ScaleType> | null
    closeModal: () => void
}
export default function ScaleModal(props: ScaleModalProps) {
    const [showChasingSuccessToolTip, setShowChasingSuccessToolTip] = useState<boolean>(false)
    const [showAvoidingFailureToolTip, setShowAvoidingFailureToolTip] = useState<boolean>(false) 

    const [goalValue, setGoalValue] = useState<string>(props.scaleToEdit?.goal || '')
    const [chasingSuccessValue, setChasingSuccessValue] = useState<string>(props.scaleToEdit?.chasingSuccessDescription || '')
    const [avoidingFailureValue, setAvoidingFailureValue] = useState<string>(props.scaleToEdit?.avoidingFailureDescription || '')

    const CREATE_SCALE = gql`
    mutation CreateScale($username: String!, $goal: String!, $chasingSuccessDescription: String, $avoidingFailureDescription: String) {
        createScale(username: $username, goal: $goal, chasingSuccessDescription: $chasingSuccessDescription, avoidingFailureDescription: $avoidingFailureDescription) {
            id
            goal
            sliderValue
            chasingSuccessDescription
            avoidingFailureDescription
        }
    }`
    const [createScale] = useMutation(CREATE_SCALE)

    const UPDATE_SCALE = gql`
    mutation UpdateScale($id: String!, $goal: String, $chasingSuccessDescription: String, $avoidingFailureDescription: String){
        updateScale(id: $id, goal: $goal, chasingSuccessDescription: $chasingSuccessDescription, avoidingFailureDescription: $avoidingFailureDescription) {
            goal
            chasingSuccessDescription
            avoidingFailureDescription
        }
    }`
    const [updateScale] = useMutation(UPDATE_SCALE)

    const handleAddScale = useCallback(async () => {
        await createScale({
            variables: {
                username: props.scaleToEdit?.username,
                goal: goalValue,
                chasingSuccessDescription: chasingSuccessValue,
                avoidingFailureDescription: avoidingFailureValue
            }
        })
        props.closeModal()
    }, [goalValue, chasingSuccessValue, avoidingFailureValue])
    const handleEditScale = useCallback(async () => {
        await updateScale({
            variables: {
                id: props.scaleToEdit?.id,
                goal: goalValue,
                chasingSuccessDescription: chasingSuccessValue,
                avoidingFailureDescription: avoidingFailureValue
            }
        })
        props.closeModal()
    }, [goalValue, chasingSuccessValue, avoidingFailureValue])

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
        <View style={styles.background}>
            <View style={styles.modal}>
                <View>
                    <View>
                        <Text style={styles.modal.inputLabel.title}>Goal</Text>
                        <TextInput style={styles.modal.textInput} defaultValue={props.scaleToEdit?.goal} placeholder="Ex: Learn a new language" onChangeText={setGoalValue} />
                    </View>
                    <View>
                        <View style={styles.modal.inputLabel}>
                            <Text style={styles.modal.inputLabel.title}>Chasing Sucess</Text>
                            <Tooltip 
                                visible={showChasingSuccessToolTip}
                                onOpen={()=>setShowChasingSuccessToolTip(true)}
                                onClose={()=>setShowChasingSuccessToolTip(false)}
                                height={80}
                                containerStyle={{width: 220}}
                                popover={
                                    <Text>
                                        What things would you have to do to feel like you will achieve your goal faster than expected?
                                    </Text>
                                }>
                                <FontAwesomeIcon icon={faCircleInfo} size={18}/>
                            </Tooltip>
                        </View>
                        <TextInput multiline={true} style={[styles.modal.textInput, styles.modal.textArea]} onChangeText={setChasingSuccessValue} defaultValue={props.scaleToEdit?.chasingSuccessDescription} placeholder="I feel like I'm making good progress when..."/>
                    </View>
                    <View>
                        <View style={styles.modal.inputLabel}>
                            <Text style={styles.modal.inputLabel.title}>Avoiding Failure</Text>
                            <Tooltip 
                                visible={showAvoidingFailureToolTip}
                                onOpen={()=>setShowAvoidingFailureToolTip(true)}
                                onClose={()=>setShowAvoidingFailureToolTip(false)}
                                height={80}
                                containerStyle={{width: 220}}
                                popover={
                                    <Text>
                                        What things would you have to do to feel like you are falling behind on achieving your goal?
                                    </Text>
                                }>
                                <FontAwesomeIcon icon={faCircleInfo} size={18}/>
                            </Tooltip>
                        </View>
                        <TextInput multiline={true} style={[styles.modal.textInput, styles.modal.textArea]} onChangeText={setAvoidingFailureValue} defaultValue={props.scaleToEdit?.avoidingFailureDescription} placeholder="I feel like I'm falling behind when..."/>
                    </View>
                </View>
                <View style={styles.modal.buttons}>
                    <TouchableOpacity onPress={props.closeModal} style={[styles.button, styles.button.cancel]}>
                        <Text style={styles.button.text}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.button.create]} onPress={props.scaleToEdit?.id ? handleEditScale : handleAddScale}>
                        <Text style={styles.button.text}>{props.scaleToEdit?.id? 'Update' : 'Create'}</Text>
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
    },
    tooltip: {
        color: 'white',
    }
})