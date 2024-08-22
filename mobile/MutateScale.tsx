import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Constants from 'expo-constants'
import variables from "./styles.variables"
import { screens } from './screens';
import ScaleQueries from './queries/scale';
import { useMutation } from '@apollo/client';
import { ScaleInput } from './types/scale';
import useForm from './hooks/useForm';

export default function MutateScale({route, navigation}: {route: any, navigation: any}) {
  const [addScale] = useMutation(ScaleQueries.CREATE_SCALE)
  
  const { onChange, onSubmit, values } = useForm<ScaleInput>(createScale, route.params)

  function createScale(){
    addScale({variables: values})
      .then(()=>navigation.navigate(screens.Dashboard))
      .catch((e)=>console.log(e.message))
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.form}>
        <View>
            <Text style={styles.form.inputLabel}>Goal</Text>
            <TextInput
              defaultValue={route.params.goal}
              style={styles.form.textInput}
              onChangeText={value=>onChange("goal", value)}
              placeholder="Ex: Learn a new language"
              placeholderTextColor={variables.highlight}
            />
        </View>
        <View>
            <Text style={styles.form.inputLabel}>Metrics for Chasing Sucess</Text>
            <TextInput
              defaultValue={route.params.chasingSuccessDescription}
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
              defaultValue={route.params.avoidingFailureDescription}
              multiline={true}
              style={styles.form.textArea}
              onChangeText={value=>onChange("avoidingFailureDescription", value)}
              placeholder="I feel like I'm falling behind when..."
              placeholderTextColor={variables.highlight}
            />
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.buttons.button, styles.buttons.button.cancel]}>
          <Text style={styles.buttons.button.text} onPress={()=>navigation.goBack()}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttons.button, styles.buttons.button.create]} onPress={()=>onSubmit()}>
          <Text style={styles.buttons.button.text}>Create</Text>
        </TouchableOpacity>
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
        delete: {
            backgroundColor: variables.buttonDanger,
        },
        create: {
            backgroundColor: variables.buttonCommit,
        },
        cancel: {
          backgroundColor: variables.highlight
        }
    } as const
  }
})
