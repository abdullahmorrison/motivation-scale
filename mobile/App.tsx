import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View} from 'react-native';

import AddScaleButton from './components/AddScaleButton';
import Scale from './components/Scale';
import ScaleModal from './components/ScaleModal';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScaleModal/>
      <View>
        <Scale/>
      </View>
      <AddScaleButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
