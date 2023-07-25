import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View} from 'react-native';

import AddScaleButton from './components/AddScaleButton';
import Scale, { ScaleType } from './components/Scale';
import ScaleModal from './components/ScaleModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)
  const [scales, setScales] = useState<Array<ScaleType>>([])
  const [username, setUsername] = useState<string>("abdullahmorrison@gmail.com")

  const handleAddScale = () => {
    setIsModalOpen(true)
  }
  const handleEdit = () => {
    setIsModalOpen(true)
  }
  useEffect(()=>{
      const fetchScales = async () => {
          if(username){
            try{
              const response = await fetch('http://localhost:3001/scales/'+username+'/username/')
              const data = await response.json()
              console.log(data)
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScaleModal closeModal={()=>setIsModalOpen(false)} isModalOpen={isModalOpen}/>
      <View>
        {
          scales.map((scale) => {
            return <Scale key={scale._id} scale={scale} handleEdit={handleEdit}/>
          })
        }
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
