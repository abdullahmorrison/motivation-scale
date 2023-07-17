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
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,
    width: 50,
    height: 50,

    // shadow
    elevation: 5,
    backgroundColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: 'black',
  }
})