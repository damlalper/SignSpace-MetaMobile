import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import LessonScreen from './src/screens/LessonScreen';

const App = () => {
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      {currentLevel ? (
        <LessonScreen
          levelId={currentLevel}
          onBack={() => setCurrentLevel(null)}
        />
      ) : (
        <HomeScreen onSelectLevel={setCurrentLevel} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // For Passthrough
  },
});

export default App;
