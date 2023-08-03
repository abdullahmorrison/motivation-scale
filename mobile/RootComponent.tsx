import React, { useState, useEffect, useCallback } from 'react'
import { BackHandler } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, View} from 'react-native'

import AddScaleButton from './components/AddScaleButton'
import Scale, { ScaleType } from './components/Scale'
import ScaleModal from './components/ScaleModal'

import { gql, useQuery } from "@apollo/client";

export default function App() {
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
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        { scaleToEdit &&
          <ScaleModal 
            scaleToEdit={scaleToEdit} 
            closeModal={()=>setScaleToEdit(null)} 
          />
        }
        <View>
          {data && data?.scales.map((scale: ScaleType) => {
            return <Scale key={scale._id} scale={scale} handleEdit={(scale: Partial<ScaleType>)=>setScaleToEdit(scale)}/>
          })}
        </View>
        <AddScaleButton onPress={()=>setScaleToEdit({
            username: username,
            goal: '',
            chasingSuccessDescription: '',
            avoidingFailureDescription: '',
        })}/>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
