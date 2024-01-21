import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllContact from './src/AllContact';
import SpecificContact from './src/SpecificContact';
import AddEditContact from './src/AddEditContact';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="allContact" component={AllContact} options={{headerShown: false}} />
            <Stack.Screen name="specificContact" component={SpecificContact} options={{headerShown: false}} />
            <Stack.Screen name="addContact" component={AddEditContact} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
