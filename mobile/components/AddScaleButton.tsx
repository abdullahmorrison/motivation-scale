import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AddScaleButton() {
    const handlePress = () => console.log("pressed");
    return(
        <TouchableOpacity style={styles.button} onPress={handlePress}>
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