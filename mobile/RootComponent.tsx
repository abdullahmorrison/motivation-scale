import React, { useState, useEffect } from 'react'
import { BackHandler, Dimensions, TouchableOpacity, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, ScrollView, View} from 'react-native'
import Constants from 'expo-constants'
import Scale from './components/Scale'
import { emptyScaleInput, ScaleData } from './types/scale'
import variables from "./styles.variables"
import { useMutation, useQuery } from "@apollo/client";
import ScaleQueries from './queries/scale'
import { screens } from "./screens"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist'
import { REORDER_SCALES } from './queries/scaleOrder'

export default function App({ navigation, route }: any) {
  const [scales, setScales] = useState<ScaleData[]>([])

  useQuery(ScaleQueries.GET_SCALES, {
    onCompleted(data){
      setScales(data.scales)
    }
  })
  const [reorderScales] = useMutation(REORDER_SCALES)

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
          <DraggableFlatList
            data={scales}
            onDragEnd={({data})=>{
              setScales(data)
              reorderScales({
                variables: {scaleOrder: data.map(scale => scale.id)},
                optimisticResponse: {
                  __typename: "Mutation",
                  reorderScales: data.map(scale => ({
                    __typename: "Scale",
                    id: scale.id,
                  })),
                },
              })
            }}
            keyExtractor={(item)=>item.id}
            contentContainerStyle={styles.scalesContainer}
            renderItem={({item, drag})=>
              <ScaleDecorator>
                <Scale
                  key={item.id.toString()}
                  scale={item}
                  onDrag={drag}
                  handleEdit={()=>{navigation.navigate(screens.MutateScale, {modalType:"edit", input: item})}}
                />
              </ScaleDecorator>
            }
          />
        </View>

        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionBar.addScaleButton} onPress={()=>{navigation.navigate(screens.MutateScale, {modalType: "add", input: emptyScaleInput})}}>
            <Text style={styles.text} >+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBar.account} onPress={()=>{navigation.navigate(screens.UserAccount)}}>
            <FontAwesomeIcon icon={faUser} color={variables.highlight}  size={30}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: variables.background,
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - Constants.statusBarHeight,
  },
  scalesContainer: {
    alignItems: "center",
    gap: 30,
    paddingTop: 20,
    paddingBottom: 100
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
