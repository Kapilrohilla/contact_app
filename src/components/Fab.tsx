import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Fab() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate('addContact', {role: 'Add'})}
      style={{position: 'absolute', bottom: 30, right: 40}}>
      <View style={styles.btn}>
        {/* <Text style={{color: '#000'}}>Fab</Text> */}
        <Image source={require('../assets/plus.png')} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'rgba(0, 178, 255, 1)',
    height: 60,
    width: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
