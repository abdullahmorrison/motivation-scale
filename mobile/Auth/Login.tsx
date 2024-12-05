import { View, Dimensions, Button, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, SafeAreaView } from "react-native"
import Constants from 'expo-constants'
import { Link } from "@react-navigation/native" 
import variables from "../styles.variables"
import useForm from "../hooks/useForm"
import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "../queries/auth"
import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext"
import { screens } from "../screens"
import { AuthInput, emptyAuthInput } from "../types/auth"

export default function LoginScreen({ navigation }: {navigation: any}){
  const context = useContext(AuthContext)
  const [loginError, setLoginError] = useState<string>()

  const { onChange, onSubmit, values } = useForm<AuthInput>(handleSubmit, emptyAuthInput)

  async function handleSubmit(){
    loginUser({variables: values})
  }

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted({loginUser}){
      context.login(loginUser)
      navigation.navigate(screens.Dashboard)
    },
    onError(e){ setLoginError(e.message) }
  })

  return (
  <SafeAreaView style={styles.contentContainer}>
    {loginError &&
      <View style={styles.popup}>
        <Text style={styles.popup.text}>{loginError}</Text>
      </View>
    }
    <Text style={styles.h2}>Login to the Motivation Scale</Text>

    <View style={styles.form}>
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.textInput}
        onFocus={()=>setLoginError(undefined)}
        onChangeText={email=>{
          setLoginError(undefined)
          onChange("email", email)
        }}
        placeholder="Enter you email"
        placeholderTextColor={variables.highlight}
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={styles.textInput}
        onFocus={()=>setLoginError(undefined)}
        onChangeText={password=>{
          setLoginError(undefined)
          onChange("password", password)
        }}
        placeholder="Enter you password"
        placeholderTextColor={variables.highlight}
     />

      <Button color={variables.highlight} title="Login" onPress={onSubmit}/>
    </View>

    <Link to={{screen: "Signup"}} style={styles.link}>Don't have an account? Sign up</Link>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: variables.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    flexGrow: 1,
    marginTop: Constants.statusBarHeight,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-Constants.statusBarHeight
  },
  h2:{
    color: variables.textPrimary,
    fontSize: 22,
    fontWeight: 'bold'
  },
  text: {
    color: variables.textPrimary,
    fontSize: 18,
    marginBottom: 5
  },
  textInput: {
    color: variables.textPrimary,
    borderWidth: 1,
    borderColor: variables.highlight,
    borderStyle: "solid",
    borderRadius: 5,
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15
  },
  link: {
    color: variables.textLink,
    fontSize: 15,
    marginTop: 15
  },
  form: {
    width: 300,
    maxWidth: Dimensions.get("window").width * 0.9
  },
  popup: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
    padding: 8,
    position: 'absolute',
    top: 20,

    text: {
      color: 'pink',
      fontSize: 18,
    }as const
  }
})
