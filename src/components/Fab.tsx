import {View, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';

export default function Fab() {
  return (
    <Pressable style={{position: 'absolute', bottom: 30, right: 40}}>
      <View style={styles.btn}>
        {/* <Text style={{color: '#000'}}>Fab</Text> */}
        <Image source={require('../assets/plus.png')} />
      </View>
    </Pressable>
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