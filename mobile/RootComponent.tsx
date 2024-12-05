import React, { useState, useEffect, useCallback, useRef } from 'react'
import { BackHandler, Dimensions, TouchableOpacity, Text, FlatList, Animated, PanResponder } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, SafeAreaView, View} from 'react-native'
import Constants from 'expo-constants'
import Scale from './components/Scale'
import { emptyScaleInput, ScaleData } from './types/scale'
import variables from "./styles.variables"
import { useMutation, useQuery } from "@apollo/client";
import ScaleQueries from './queries/scale'
import { screens } from "./screens"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { REORDER_SCALES } from './queries/scaleOrder'

export default function App({ navigation, route }: any) {
  const [scales, setScales] = useState<ScaleData[]>([])
  const [sliderDragging, setSliderDragging] = useState(false)
  const scalesRef = useRef<ScaleData[]>([])
  useEffect(()=>{
    scalesRef.current = scales
  },[scales])

  useQuery(ScaleQueries.GET_SCALES, {
    onCompleted(data){ setScales(data.scales) }
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

  const [draggingScale, setDraggingScale] = useState<ScaleData | undefined>()
  const scrollOffset = useRef(0);
  const scaleHeight = useRef(0)
  const cursorPoint = useRef(new Animated.ValueXY())

  const originalScaleIdx = useRef(0)
  const scaleIdx = useRef(0)

  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (_, gestureState) => { // The gesture has started.
        const idx = Math.floor((scrollOffset.current+gestureState.y0)/scaleHeight.current)
        scaleIdx.current = idx
        originalScaleIdx.current = scaleIdx.current
        setDraggingScale(scalesRef.current[idx])
        Animated.event([{y: cursorPoint.current.y, x: cursorPoint.current.x}], { useNativeDriver: false })({y: gestureState.y0, x: gestureState.x0})
      },
      onPanResponderMove: (_, gestureState) => {
        Animated.event([{y: cursorPoint.current.y, x: cursorPoint.current.x}], { useNativeDriver: false })({y: gestureState.moveY, x: gestureState.moveX})
        const to = Math.floor((scrollOffset.current+gestureState.moveY)/scaleHeight.current)
        if(scaleIdx.current!=to){
          swapScales(scaleIdx.current, to)
          scaleIdx.current = to
        }
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderRelease: () => {//gesture ended
        setDraggingScale(undefined)
        if(originalScaleIdx.current!=scaleIdx.current)
          reorderScales({variables: {scaleOrder: scalesRef.current.map(scale => scale.id)}})
      },
      onShouldBlockNativeResponder: () => true
    })
  ).current;

  const swapScales = useCallback((from: number, to: number)=>{
    const newScales = [...scalesRef.current]
    const [removed] = newScales.splice(from, 1)
    newScales.splice(to, 0, removed)
    setScales(newScales)
  }, [scales])

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={variables.background} style='inverted'/>

      <View style={styles.contentContainer} >
        {draggingScale &&
          <Animated.View style={{
            alignSelf: 'center',
            position: 'absolute',
            zIndex: 2,
            top: cursorPoint.current.getLayout().top.interpolate({
              inputRange: [0, 1],
              // Subtract statusBarHeight from top
              outputRange: [0 - Constants.statusBarHeight - 20, 1 - Constants.statusBarHeight - 20],
            }),
            left: cursorPoint.current.getLayout().left.interpolate({
              inputRange: [0, 1],
              outputRange: [0-40, 1-40],
            })
          }}>
            <Scale
              scale={draggingScale}
              handleEdit={()=>{navigation.navigate(screens.MutateScale, {modalType:"edit", input: draggingScale})}}
              dragNDropHandlers={panResponder.panHandlers}
              isDragging={false}
              onLayout={(e)=> scaleHeight.current = e.nativeEvent.layout.height + 30 }
              onSliderDrag={()=>{}}
            />
          </Animated.View>
        }
        
        <FlatList
          data={scales}
          scrollEnabled={!draggingScale && !sliderDragging}
          contentContainerStyle={styles.scalesContainer}
          keyExtractor={(item=>item.id.toString())}
          renderItem={({item})=>
            <Scale
              scale={item}
              handleEdit={()=>{navigation.navigate(screens.MutateScale, {modalType:"edit", input: item})}}
              dragNDropHandlers={panResponder.panHandlers}
              isDragging={draggingScale?.id == item.id}
              onLayout={(e)=> scaleHeight.current = e.nativeEvent.layout.height + 30 }
              onSliderDrag={(isDragging)=>setSliderDragging(isDragging)}
            />
          }
          onScroll={(e)=>scrollOffset.current = e.nativeEvent.contentOffset.y}
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
    height: Dimensions.get('window').height-Constants.statusBarHeight,
  },
  scalesContainer: {
    alignItems: "center",
    gap: 30,
    paddingTop: 10,
    paddingBottom: 150
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
