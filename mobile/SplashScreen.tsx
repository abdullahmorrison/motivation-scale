import { Dimensions, StyleSheet } from "react-native"
import Constants from 'expo-constants'
import { View, Image } from "react-native"
import variables from "./styles.variables"
import { useContext, useEffect } from "react"
import { screens } from "./screens"
import { AuthContext } from "./context/authContext"

export default function SplashScreen({ navigation }: {navigation: any}){
  const { user } = useContext(AuthContext)

  useEffect(()=>{
    if(user) navigation.navigate(screens.Dashboard)
    else navigation.navigate(screens.Signup)
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
