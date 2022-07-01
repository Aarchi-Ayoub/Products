import React from 'react';
import {SafeAreaView} from 'react-native';
import Main from './src';
import {styles} from 'styles';
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Main />
    </SafeAreaView>
  );
};

export default App;
