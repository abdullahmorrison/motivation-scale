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

export default function App({ navigation }: {navigation: any}) {
  const [scales, setScales] = useState<ScaleData[]>([])

  useQuery(ScaleQueries.GET_SCALES, {
    onCompleted(data){
      setScales(data.scales)
    }
  })

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
        <View>
          {scales && scales.map((scale: ScaleData) =>
            <Scale
              key={scale.id}
              scale={scale}
              handleEdit={()=>{navigation.navigate(screens.MutateScale, scale)}}
            />
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate(screens.MutateScale, emptyScaleInput)}}>
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
