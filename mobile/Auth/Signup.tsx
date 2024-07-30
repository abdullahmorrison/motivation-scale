import { View, Dimensions, Button, Text, TextInput, StyleSheet } from "react-native"
import { Link } from "@react-navigation/native" 
import variables from "../styles.variables"
import Constants from 'expo-constants'
import useForm from "../hooks/useForm"
import { useMutation } from "@apollo/client"
import { REGISTER_USER } from "../queries/auth"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { screens } from "../screens"


export default function SignupScreen({ navigation }: {navigation: any}){
  const context = useContext(AuthContext)

  const { onChange, onSubmit, values } = useForm(handleSubmit, {
    email: "",
    password: ""
  })

  async function handleSubmit(){
    console.log(values)
    registerUser()
  }

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted({loginUser: registerUser}){
      console.log(registerUser)
      context.login(registerUser)
      navigation.navigate(screens.Dashboard)
    },
    onError(e){
      console.log("ERROR")
      console.log(e.message)
    },
    variables: { email: values.email,  password: values.password }
  })


  return (
    <View style={styles.contentContainer}>
      <Text style={styles.h2}>Signup to The Motivation Scale</Text>

      <View style={styles.form}>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.textInput} onChangeText={(value)=>onChange("email", value)} placeholder="Enter you email" placeholderTextColor={variables.highlight}/>

        <Text style={styles.text}>Password</Text>
        <TextInput style={styles.textInput} onChangeText={(value)=>onChange("password", value)} placeholder="Enter you password" placeholderTextColor={variables.highlight}/>

        <Button color={variables.highlight} title="Sign up" onPress={onSubmit}/>
      </View>

      <Link to={{screen: "Login"}} style={styles.link}>Already have an account? Login</Link>
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
  h2:{
    color: variables.textPrimary,
    fontSize: 25
  },
  text: {
    color: variables.textPrimary,
    fontSize: 15
  },
  textInput: {
    color: variables.textPrimary,
    borderWidth: 1,
    borderColor: variables.highlight,
    borderStyle: "solid",
    borderRadius: 5,
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  link: {
    color: variables.textLink,
    marginTop: 15
  },
  form: {
    width: 300,
    maxWidth: Dimensions.get("window").width * 0.9
  }
})

