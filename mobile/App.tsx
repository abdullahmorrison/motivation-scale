import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, View} from 'react-native';

import AddScaleButton from './components/AddScaleButton';
import Scale from './components/Scale';
import ScaleModal from './components/ScaleModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false)

  const handleAddScale = () => {
    setIsModalOpen(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScaleModal closeModal={()=>setIsModalOpen(false)} isModalOpen={isModalOpen}/>
      <View>
        <Scale/>
      </View>
      <AddScaleButton onPress={handleAddScale}/>
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
