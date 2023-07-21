import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity} from "react-native";
import { Slider } from '@react-native-assets/slider'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSortDown, faBars, faEdit} from "@fortawesome/free-solid-svg-icons";

export default function Scale() {
    const [goal, setGoal] = useState<String>("Test")

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faBars} size={20}/>
                </TouchableOpacity>
                <Text style={styles.header.goal}>{goal}</Text>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faEdit} size={20}/>
                </TouchableOpacity>
            </View>
            <Slider
                value={50}
                minimumValue={0}
                maximumValue={100}
                step={1}
                slideOnTap={false}
                style={styles.slider}
                thumbStyle={styles.slider.thumb}
                trackStyle={styles.slider.track}
            />
            <TouchableOpacity style={styles.expand}>
                <FontAwesomeIcon icon={faSortDown} size={25}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 10,

        padding: 10,
        marginTop: 10,
        marginBottom: 10,

        elevation: 3,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        goal: {
            fontSize: 20,
            fontWeight: 'bold',
        } as const
    },
    slider: {
        thumb: {
            borderRadius: 30,
            backgroundColor: 'white',
            borderColor: 'grey',
            borderWidth: 0.5,

            height: 30,
            width: 30,
        },
        track: {
            height: 20,
            borderRadius: 10,
        },
        marginBottom: 5,
        marginTop: 10,
        height: 40,
        width: Dimensions.get('window').width * 0.85,
    },
    expand: {
        borderTopWidth: 0.5,
        borderTopColor: 'grey',
        margin: -10,
        marginTop: 10,
        paddingBottom: 10,

        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
    }
})