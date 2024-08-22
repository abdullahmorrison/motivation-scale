import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, BackHandler} from 'react-native';
import Constants from 'expo-constants'
import variables from "./styles.variables"
import { screens } from './screens';
import ScaleQueries from './queries/scale';
import { useMutation } from '@apollo/client';
import { ScaleInput } from './types/scale';
import useForm from './hooks/useForm';
import { useEffect } from 'react';

export default function MutateScale({route, navigation}: any) {
  const { onChange, values } = useForm<ScaleInput>(route.params)

  const [addScale] = useMutation(ScaleQueries.CREATE_SCALE, {
    variables: values,
    onCompleted(data){ 
      navigation.navigate(screens.Dashboard, {mutationType: "add", scale: data.createScale}) 
    },
    onError(e){
      console.log(e)
    }
  })
  const [updateScale] = useMutation(ScaleQueries.UPDATE_SCALE, {
    variables: {...route.params.input, ...values},
    onCompleted(data){
      navigation.navigate(screens.Dashboard, {mutationType: "edit", scale: data.updateScale}) 
    },
    onError(e){
      console.log(e)
    }
  })
  const [deleteScale] = useMutation(ScaleQueries.DELETE_SCALE, {
    variables: {id: route.params.input.id},
    onCompleted(data){
      navigation.navigate(screens.Dashboard, {mutationType: "delete", scale: data.deleteScale}) 
    },
    onError(e){
      console.log(e)
    }
  })

  const handleBackButton = () => {
    navigation.goBack()
    return true
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButton)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    }
  }, [])

  return (
    <View style={styles.contentContainer}>
      <View style={styles.form}>
        <View>
            <Text style={styles.form.inputLabel}>Goal</Text>
            <TextInput
              defaultValue={route.params.input.goal}
              style={styles.form.textInput}
              onChangeText={value=>onChange("goal", value)}
              placeholder="Ex: Learn a new language"
              placeholderTextColor={variables.highlight}
            />
        </View>
        <View>
            <Text style={styles.form.inputLabel}>Metrics for Chasing Sucess</Text>
            <TextInput
              defaultValue={route.params.input.chasingSuccessDescription}
              multiline={true}
              style={styles.form.textArea}
              onChangeText={value=>onChange("chasingSuccessDescription", value)}
              placeholder="I feel like I'm making good progress when..."
              placeholderTextColor={variables.highlight}
            />
        </View>
        <View>
            <Text style={styles.form.inputLabel}>Metrics for Avoiding Failure</Text>
            <TextInput
              defaultValue={route.params.input.avoidingFailureDescription}
              multiline={true}
              style={styles.form.textArea}
              onChangeText={value=>onChange("avoidingFailureDescription", value)}
              placeholder="I feel like I'm falling behind when..."
              placeholderTextColor={variables.highlight}
            />
        </View>
      </View>

      <View style={styles.buttons}>
        {route.params.modalType == "add" ?
        <>
          <TouchableOpacity style={[styles.buttons.button, styles.buttons.button.neutral]}>
            <Text style={styles.buttons.button.text} onPress={()=>navigation.goBack()}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons.button, styles.buttons.button.confirm]} onPress={()=>addScale()}>
            <Text style={styles.buttons.button.text}>Create</Text>
          </TouchableOpacity>
        </>
        :route.params.modalType == "edit" ?
        <>
          <TouchableOpacity style={[styles.buttons.button, styles.buttons.button.danger]}>
            <Text style={styles.buttons.button.text} onPress={()=>deleteScale()}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons.button, styles.buttons.button.confirm]} onPress={()=>updateScale()}>
            <Text style={styles.buttons.button.text}>Update</Text>
          </TouchableOpacity>
        </>
        :null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: variables.background,
    marginTop: Constants.statusBarHeight,
    padding: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  form:{
    flex: 9, //make it 9/10s of screen
    gap: 20,

    inputLabel: {
      fontSize: 15,
      fontWeight: 'bold',
      color: variables.textPrimary,
    } as const,
    textInput: {
      borderColor: 'grey',
      borderWidth: 0.5,
      borderRadius: 5,
      color: variables.textPrimary,
      paddingVertical: 5,
      paddingHorizontal: 10,
    } as const,
    textArea: {
      borderColor: 'grey',
      borderWidth: 0.5,
      borderRadius: 5,
      color: variables.textPrimary,
      height: 150,
      textAlignVertical: 'top',
      padding: 10,
    } as const,
  },
  buttons: {
    flex: 1, //push buttons to bottom by making it 1/10 of screen
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    gap: 5,

    button: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 5,
        elevation: 3,
        padding: 8,
        width: '40%',

        text: {
            fontWeight: 'bold',
            color: variables.textPrimary
        },
        danger: {
            backgroundColor: variables.buttonDanger,
        },
        confirm: {
            backgroundColor: variables.buttonCommit,
        },
        neutral: {
          backgroundColor: variables.highlight
        }
    } as const
  }
})
