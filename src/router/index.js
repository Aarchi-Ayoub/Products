import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Modules
import Home from 'containers/Home';
import Details from 'containers/Details';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={({route}) => ({headerTitle: route.params.title})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
