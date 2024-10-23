import { View, Dimensions, Button, Text, TextInput, StyleSheet, SafeAreaView } from "react-native"
import { Link } from "@react-navigation/native" 
import variables from "../styles.variables"
import useForm from "../hooks/useForm"
import { useMutation } from "@apollo/client"
import { REGISTER_USER } from "../queries/auth"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { screens } from "../screens"
import { AuthInput, emptyAuthInput } from "../types/auth"

export default function SignupScreen({ navigation }: {navigation: any}){
  const context = useContext(AuthContext)

  const { onChange, onSubmit, values } = useForm<AuthInput>(handleSubmit, emptyAuthInput)

  async function handleSubmit(){
    registerUser({variables: values})
  }

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted({loginUser: registerUser}){
      context.login(registerUser)
      navigation.navigate(screens.Dashboard)
    },
    onError(e){ console.log(e.message) }
  })

  return (
    <SafeAreaView style={styles.contentContainer}>
      <Text style={styles.h2}>Signup to the Motivation Scale</Text>

      <View style={styles.form}>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.textInput} onChangeText={email=>onChange("email", email)} placeholder="Enter you email" placeholderTextColor={variables.highlight}/>

        <Text style={styles.text}>Password</Text>
        <TextInput secureTextEntry={true} style={styles.textInput} onChangeText={password=>onChange("password", password)} placeholder="Enter you password" placeholderTextColor={variables.highlight}/>

        <Button color={variables.highlight} title="Sign up" onPress={onSubmit}/>
      </View>

      <Link to={{screen: "Login"}} style={styles.link}>Already have an account? Login</Link>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
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
  }
})

