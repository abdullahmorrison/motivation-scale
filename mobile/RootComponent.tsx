import React, { useState, useEffect, useCallback } from 'react'
import { BackHandler } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, View} from 'react-native'

import AddScaleButton from './components/AddScaleButton'
import Scale, { ScaleType } from './components/Scale'
import ScaleModal from './components/ScaleModal'

import { gql, useQuery } from "@apollo/client";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
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

  const handleAddScale = useCallback(() => {
    // setScaleToEdit({
    //   _id: '',
    //   username: username,
    //   title: '',
    //   chasingSuccessDescription: '',
    //   avoidingFailureDescription: '',
    // })
  }, [username])

  const handleEdit = useCallback((scale: Partial<ScaleType>) => {
    setScaleToEdit(scale)
  }, [])

  useEffect(() => {
    if(scaleToEdit != null) setIsModalOpen(true)
  }, [scaleToEdit])

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

  const handleCloseModal = useCallback(() => {
    setScaleToEdit(null)
    setIsModalOpen(false)
  }, [scaleToEdit])

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        { scaleToEdit != null &&
          <ScaleModal scaleToEdit={scaleToEdit} closeModal={handleCloseModal} isModalOpen={isModalOpen}/>
        }
        <View>
          {data && data?.scales.map((scale: ScaleType) => {
            return <Scale key={scale._id} scale={scale} handleEdit={(scale: Partial<ScaleType>)=>handleEdit(scale)}/>
          })}
        </View>
        <AddScaleButton onPress={handleAddScale}/>
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
