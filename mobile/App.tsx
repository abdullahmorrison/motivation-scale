import React, { useState, useEffect, useCallback } from 'react'
import { BackHandler } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, View} from 'react-native'

import AddScaleButton from './components/AddScaleButton'
import Scale, { ScaleType } from './components/Scale'
import ScaleModal from './components/ScaleModal'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
  const [scales, setScales] = useState<Array<ScaleType>>([])
  const [scaleToEdit, setScaleToEdit] = useState<Partial<ScaleType>|null>(null)
  const [username, setUsername] = useState<string>("abdullahmorrison@gmail.com")

  const handleAddScale = useCallback(() => {
    setScaleToEdit({
      _id: '',
      username: username,
      title: '',
      chasingSuccessDescription: '',
      avoidingFailureDescription: '',
      order: scales.length
    })
    
  }, [])

  const handleEdit = useCallback((scale: Partial<ScaleType>) => {
    setScaleToEdit(scale)
  }, [])

  useEffect(() => {
    if(scaleToEdit != null) setIsModalOpen(true)
  }, [scaleToEdit])

  useEffect(()=>{
      const fetchScales = async () => {
          if(username){
            try{
              const response = await fetch('http://localhost:3001/scales/'+username+'/username/')
              const data = await response.json()
              setScales(data.sort(function (a: {order: number}, b:{order: number}) {//sorting scales by the order attribute
                  return a.order - b.order;
                }))
            }catch(error){
              console.error(error)
            }
          }else{
              console.error("Error: NO USER when fetching scales")
          }
      }
      fetchScales()
  }, [username])

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
        {scales.map((scale) => {
          return <Scale key={scale._id} scale={scale} handleEdit={(scale: Partial<ScaleType>)=>handleEdit(scale)}/>
        })}
      </View>
      <AddScaleButton onPress={handleAddScale}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
