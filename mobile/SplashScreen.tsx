import { Dimensions, StyleSheet } from "react-native"
import Constants from 'expo-constants'
import { View, Image } from "react-native"
import variables from "./styles.variables"
import storage from "./Storage"
import { useEffect } from "react"
import { screens } from "./screens"

export default function SplashScreen({ navigation }: {navigation: any}){
  useEffect(()=>{
    storage.load({key: "app-opened"}).then(()=>{
      storage.load({key: "token"})
        .then(()=> navigation.navigate(screens.Dashboard))
        .catch(()=> navigation.navigate(screens.Login))
    }).catch(()=> navigation.navigate(screens.Signup))
  }, [])

  return (
    <View style={styles.contentContainer}>
      <Image source={require("./assets/logo.svg")} style={styles.img}/>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: variables.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  img: {
    width: 100,
    height: 100,
  }
})
