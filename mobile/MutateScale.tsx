import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Constants from 'expo-constants'
import variables from "./styles.variables"
import { screens } from './screens';

export default function MutateScale({navigation}: {navigation: any}) {
  function cancelMutation(){
    navigation.navigate(screens.Dashboard)
  }
  return (
    <View style={styles.contentContainer}>
      <View style={styles.form}>
        <View>
            <Text style={styles.form.inputLabel}>Goal</Text>
            <TextInput style={styles.form.textInput} placeholder="Ex: Learn a new language" placeholderTextColor={variables.highlight}/>
        </View>
        <View>
            <Text style={styles.form.inputLabel}>Metrics for Chasing Sucess</Text>
            <TextInput multiline={true} style={styles.form.textArea}  placeholder="I feel like I'm making good progress when..." placeholderTextColor={variables.highlight}/>
        </View>
        <View>
            <Text style={styles.form.inputLabel}>Metrics for Avoiding Failure</Text>
            <TextInput multiline={true} style={styles.form.textArea}  placeholder="I feel like I'm falling behind when..." placeholderTextColor={variables.highlight}/>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.buttons.button, styles.buttons.button.cancel]}>
          <Text style={styles.buttons.button.text} onPress={()=>cancelMutation()}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttons.button, styles.buttons.button.create]}>
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
