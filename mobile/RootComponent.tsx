import React, { useState, useEffect } from 'react'
import { BackHandler, Dimensions, TouchableOpacity, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, ScrollView, View} from 'react-native'
import Constants from 'expo-constants'

import Scale, { ScaleType } from './components/Scale'
import ScaleModal from './components/ScaleModal'
import variables from "./styles.variables"

import { gql, useQuery } from "@apollo/client";

export default function App() {
  const [scales, setScales] = useState<ScaleType[]>([])
  const [scaleToEdit, setScaleToEdit] = useState<Partial<ScaleType>|null>(null)
  const [username, setUsername] = useState<string>("abdullahmorrison@gmail.com")

  const GET_SCALES = gql`
    {
      scales {
        id
        username
        goal
        sliderValue
        chasingSuccessDescription
        avoidingFailureDescription
      }
    }`

  const { data, loading, error } = useQuery(GET_SCALES)
  useEffect(() => {
    if (data)
      setScales(data.scales)
  }, [data])

  const handleBackButton = () => {//close app on back button press
    BackHandler.exitApp()
    return true
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }
  }, [])

  return (
      <SafeAreaView>
        <StatusBar style="auto" />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          { scaleToEdit &&
            <ScaleModal 
              scaleToEdit={scaleToEdit} 
              addScale={(scale: ScaleType)=>setScales([...scales, scale])}
              editScale={(scale: ScaleType)=>setScales(scales.map((s: ScaleType)=>s.id===scale.id?{...scale, sliderValue: s.sliderValue}:s))}
              deleteScale={(id: string)=>setScales(scales.filter((s: ScaleType)=>s.id!==id))}
              closeModal={()=>setScaleToEdit(null)} 
            />
          }
          <View>
            {scales && scales.map((scale: ScaleType) => {
              return <Scale key={scale.id} scale={scale} handleEdit={(scale: Partial<ScaleType>)=>setScaleToEdit(scale)}/>
            })}
          </View>
          <TouchableOpacity style={styles.button} onPress={()=>setScaleToEdit({
              username: username,
              goal: '',
              chasingSuccessDescription: '',
              avoidingFailureDescription: '',
          })}>
              <Text style={styles.text} >+</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: variables.background,
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    paddingTop: 100,
    paddingBottom: 100,
    flexGrow: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  button: {
    alignItems: 'center',
    backgroundColor: variables.primary,
    borderRadius: 10,
    elevation: 5,

    margin: 20,
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 30,
    color: variables.textPrimary,
  }
});
