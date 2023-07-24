import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity} from "react-native";
import { Slider } from '@react-native-assets/slider'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSortDown, faSortUp, faBars, faEdit} from "@fortawesome/free-solid-svg-icons";


interface ScaleProps {
    onEdit: () => void
}
export default function Scale(props: ScaleProps) {
    const [goal, setGoal] = useState<String>("Test")
    const [expandScale, setExpandScale] = useState<Boolean>(false)

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faBars} size={20}/>
                </TouchableOpacity>
                <Text style={styles.header.goal}>{goal}</Text>
                <TouchableOpacity style={styles.header.editIcon} onPress={props.onEdit}>
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
            {   expandScale &&
                <View style={styles.explanations}>
                    <View style={styles.explanations.section}>
                        <Text style={styles.explanations.title}>Chasing Success</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione officia iusto consequuntur esse cum velit vero! Sed inventore id nulla nemo ad odio, quidem, doloribus, ut officia soluta quas autem.</Text>
                    </View> 
                    <View style={styles.explanations.section}>
                        <Text style={styles.explanations.title}>Avoiding Failure</Text>
                        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione officia iusto consequuntur esse cum velit vero! Sed inventore id nulla nemo ad odio, quidem, doloribus, ut officia soluta quas autem.</Text>
                    </View> 
                </View>
            }
            <TouchableOpacity style={styles.expand} onPress={()=>setExpandScale(!expandScale)}>
                <FontAwesomeIcon icon={expandScale ? faSortUp : faSortDown} size={25} style={expandScale ? styles.flippedIcon : undefined}/>
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
        width: Dimensions.get('window').width * 0.9,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        editIcon: {
            elevation: 3,
            backgroundColor: 'white',
            borderRadius: 5,
            padding: 5,
        } as const,

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
    },
    explanations: {
        borderTopWidth: 0.5,
        borderTopColor: 'grey',
        margin: -10,
        marginTop: 10,
        padding: 10,

        section: {
            marginBottom: 10,
        } as const,
        title: {
            fontWeight: 'bold',
        } as const
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
    flippedIcon: { // fixes icon positioning when it is flipped
        marginTop: 10,
        marginBottom: -10,
    }
})