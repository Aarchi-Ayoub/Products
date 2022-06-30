import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {styles} from 'styles';
import Router from './router';

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <Text>index</Text>
      </View> */}
      <Router />
    </SafeAreaView>
  );
};

export default index;
