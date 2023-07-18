import { StyleSheet, View, Text, Dimensions} from "react-native";
import { Slider } from '@react-native-assets/slider'

export default function Scale() {
    return (
        <View style={styles.container}>
            <View>
                <Text>Title</Text>
            </View>
            <Slider
                value={50}
                minimumValue={0}
                maximumValue={100}
                step={1}
                slideOnTap={false}
                style={styles.slider}
                thumbStyle={styles.slider.thumb}
                trackStyle={styles.slider.track}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 10,

        padding: 10,
        marginTop: 10,
        marginBottom: 10,

        elevation: 3,
        backgroundColor: 'white',
    },
    slider: {
        thumb: {
            borderRadius: 20,
            backgroundColor: 'white',
            borderColor: 'grey',
            borderWidth: 0.5,

            height: 30,
            width: 30,
        },
        track: {
            height: 15,
            borderRadius: 10,
        },
        height: 40,
        width: Dimensions.get('window').width * 0.85,
    }
});