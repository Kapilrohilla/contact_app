import {View, Text, Image} from 'react-native';
import React from 'react';

export default function NoContactFound() {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, gap: 20}}>
      <Image source={require('../assets/emptyBox.png')} style={{height: 100, width: 105}} />
      <Text style={{color: '#000', opacity: 0.4, fontWeight: '500'}}>You have no contacts yet</Text>
    </View>
  );
}
