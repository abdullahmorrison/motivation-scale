import React, { useState, useEffect } from 'react'
import { BackHandler, Dimensions, TouchableOpacity, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, ScrollView, View} from 'react-native'
import Constants from 'expo-constants'
import Scale from './components/Scale'
import { emptyScaleInput, ScaleData } from './types/scale'
import variables from "./styles.variables"
import { useQuery } from "@apollo/client";
import ScaleQueries from './queries/scale'
import { screens } from "./screens"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default function App({ navigation, route }: any) {
  const [scales, setScales] = useState<ScaleData[]>([])

  useQuery(ScaleQueries.GET_SCALES, {
    onCompleted(data){
      setScales(data.scales)
    }
  })

  useEffect(()=>{
    const mutationType = route.params?.mutationType
    const scale: ScaleData = route.params?.scale
    if(mutationType=="add")
        setScales(prev=>[...prev, scale])
    else if(mutationType=="edit")
        setScales(prev=>prev.map((oldScale)=>oldScale.id==scale.id ? scale : oldScale))
    else if(mutationType=="delete")
        setScales(prev=>prev.filter(s=>s.id!=scale.id))
  }, [route.params])

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
      <StatusBar backgroundColor={variables.background} style='inverted'/>

      <View style={styles.contentContainer} >
        <ScrollView contentContainerStyle={styles.scalesContainer}>
          {scales && scales.map((scale: ScaleData) =>
            <Scale
              key={scale.id}
              scale={scale}
              handleEdit={()=>{navigation.navigate(screens.MutateScale, {modalType:"edit", input: scale})}}
            />
          )}
        </ScrollView>
      </View>

      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionBar.addScaleButton} onPress={()=>{navigation.navigate(screens.MutateScale, {modalType: "add", input: emptyScaleInput})}}>
          <Text style={styles.text} >+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBar.account}>
          <FontAwesomeIcon icon={faUser} color={variables.highlight}  size={30}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: variables.background,
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    paddingTop: 20,
    flexGrow: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - Constants.statusBarHeight,
  },
  scalesContainer:{
    paddingBottom: 150,
    gap: 30
  },
  text: {
    fontSize: 30,
    color: variables.textPrimary,
  },
  actionBar: {
    backgroundColor: variables.background,
    borderTopColor: variables.highlight,
    borderWidth: 2,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: Dimensions.get('window').width,

    addScaleButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: variables.primary,
      borderRadius: 10,
      elevation: 5,

      width: 50,
      height: 50,
    } as const,
    account: {
      position: 'absolute',
      right: 0,
      padding: 20,
    } as const
  }
})
