import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface AddScaleButtonProps {
    onPress: () => void,
}
export default function AddScaleButton(props: AddScaleButtonProps) {
    return(
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.text} >+</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,

    elevation: 5,
    backgroundColor: 'white',

    margin: 20,
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 30,
    color: 'black',
  }
})