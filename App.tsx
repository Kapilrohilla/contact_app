import {View, Text} from 'react-native';
import React from 'react';
import {PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <View>
        <Text>Hello this is a contact application created using react-native</Text>
      </View>
    </PaperProvider>
  );
}
