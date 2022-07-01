import React from 'react';
import {View} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import Router from './router';
import {styles} from 'styles';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

export default () => {
  return (
    <View style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </View>
  );
};
