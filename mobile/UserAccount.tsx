import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native"
import Constants from 'expo-constants'
import { View } from "react-native"
import variables from "./styles.variables"
import { useContext, useEffect } from "react"
import { screens } from "./screens"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "./context/authContext"

export default function UserAccount({ navigation }: any){
  const { user, logout}= useContext(AuthContext)

  useEffect(()=>{
    if(!user) navigation.navigate(screens.Login)
  }, [user])

  return (
    <View style={styles.contentContainer}>
      <View style={styles.accountInformation}>
        <View>
          <Text style={styles.h1}>Account</Text>
          <Text style={styles.h3}>{user ? user["email"] : null}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>logout()}>
          <Text style={styles.button.text}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionBar.back} onPress={()=>navigation.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} color={variables.highlight} size={30}/>        
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: variables.background,
    marginTop: Constants.statusBarHeight,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  accountInformation:{
    justifyContent: 'space-between',
    flexGrow: 1,
    padding: 30
  },
  actionBar: {
    backgroundColor: variables.background,
    borderTopColor: variables.highlight,
    borderWidth: 2,
    flexDirection: 'row', 
    alignItems: 'center',
    width: Dimensions.get('window').width,

    back:{
      padding: 20
    }
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    color: variables.textPrimary,
  },
  h3:{
    fontSize: 20,
    color: variables.textPrimary,
  },
  button: {
    alignItems: 'center',
    borderColor: variables.highlight,
    borderWidth: 0.5,
    borderRadius: 5,
    elevation: 3,
    padding: 10,

    text: {
        fontSize: 20,
        color: variables.textPrimary,
        fontWeight: 'bold'
    } as const
  }
})
