import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, GestureResponderHandlers, LayoutChangeEvent} from "react-native";
import { Slider } from '@miblanchard/react-native-slider'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSortDown, faSortUp, faBars, faEdit} from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import variables from "../styles.variables";
import { ScaleData } from "../types/scale";
import ScaleQueries from "../queries/scale";
import { LinearGradient } from 'expo-linear-gradient'
import Tooltip from "./Tooltip";

interface ScaleProps {
    scale: ScaleData
    handleEdit: (scale: ScaleData) => void
    onLayout: (event: LayoutChangeEvent) => void
    dragNDropHandlers: GestureResponderHandlers
    isDragging: boolean
    onSliderDrag: (val: boolean)=> void
}
export default function Scale(props: ScaleProps) {
    const [expandScale, setExpandScale] = useState<Boolean>(false)
    const [sliderValue, setSliderValue] = useState(props.scale.sliderValue)
    const [showToolTip, setShowToolTip] = useState(false)

    const [updateScaleSliderValue] = useMutation(ScaleQueries.UPDATE_SCALE,{
      onError(e){
        console.log(e)
      }
    })

    return (
        <View style={props.isDragging ? styles.hidden: styles.container} onLayout={(e)=>props.onLayout(e)}>
            <View style={styles.header}>
                <View {...props.dragNDropHandlers}>
                    <FontAwesomeIcon icon={faBars} style={styles.header.dragNDrop} size={20}/>
                </View>
                <Text style={styles.header.goal}>{props.scale.goal}</Text>
                <TouchableOpacity style={styles.header.editIcon} onPress={()=>props.handleEdit(props.scale)}>
                    <FontAwesomeIcon icon={faEdit} style={styles.header.editIcon.icon} size={20}/>
                </TouchableOpacity>
            </View>
            <View style={styles.sliderContainer}>
              {showToolTip ? <Tooltip sliderValue={sliderValue}/> :null }
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['red', 'green']}
                style={styles.slider.track}
              />
              <Slider
                  value={sliderValue}
                  minimumValue={0}
                  maximumValue={100}
                  step={1}
                  containerStyle={styles.slider}
                  thumbStyle={styles.slider.thumb}
                  trackStyle={{backgroundColor: 'transparent'}}
                  minimumTrackStyle={{backgroundColor: 'transparent'}}
                  onSlidingStart={()=>{
                    setShowToolTip(true)
                    props.onSliderDrag(true)
                  }}
                  onValueChange={(value)=>setSliderValue(value[0])}
                  onSlidingComplete={(value)=>{
                    setShowToolTip(false)
                    props.onSliderDrag(false)
                    updateScaleSliderValue({
                      variables: {
                          id: props.scale.id,
                          sliderValue: value[0]
                      }
                  })}}
              />
            </View>
            { expandScale &&
                <View style={styles.explanations}>
                    <View style={styles.explanations.section}>
                        <Text style={styles.explanations.title}>Chasing Success</Text>
                        <Text style={styles.explanations.chasingSuccessDescription}>{props.scale.chasingSuccessDescription}</Text>
                    </View> 
                    <View style={styles.explanations.section}>
                        <Text style={styles.explanations.title}>Avoiding Failure</Text>
                        <Text style={styles.explanations.avoidingFailureDescription}>{props.scale.avoidingFailureDescription}</Text>
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
    hidden:{
      opacity: 0,
      paddingTop: 10,
      paddingBottom: 20,
    },
    container: {
        borderRadius: 10,

        paddingHorizontal: 30,
        paddingTop: 10,
        paddingBottom: 20,

        elevation: 3,
        backgroundColor: variables.primary,
        width: Dimensions.get('window').width * 0.9,
        maxWidth: 950
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        dragNDrop: {
          color: variables.secondary
        },
        editIcon: {
            elevation: 3,
            borderRadius: 5,
            padding: 5,

            icon: { 
              color: variables.secondary 
            },
        } as const,

        goal: {
            color: variables.textPrimary,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            maxWidth: '80%'
        } as const
    },
    sliderContainer:{
      justifyContent: 'center',
      marginTop: 20
    },
    slider: {
        position: 'absolute',
        width: '100%',
        height: 40,
        thumb: {
            borderRadius: 30,
            backgroundColor: variables.secondary,

            height: 35,
            width: 35,
        },
        track: {
            height: 25,
            borderRadius: 15,
        }
    },
    explanations: {
        margin: -10,
        marginTop: 30,
        padding: 10,

        section: {
            marginBottom: 10,
        } as const,
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            color: variables.secondary
        } as const,
        chasingSuccessDescription: { color: variables.secondary },
        avoidingFailureDescription: { color: variables.secondary }
    },
    expand: {
        backgroundColor: variables.highlight,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        margin: -30,
        marginTop: 30,
        paddingBottom: 10,

        alignItems: 'center',
        justifyContent: 'center',
    },
    flippedIcon: { // fixes icon positioning when it is flipped
        marginTop: 10,
        marginBottom: -10,
    }
})
