import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import type {Contact as TypeContact} from 'react-native-contacts';
import {useNavigation} from '@react-navigation/native';
import SendIntentAndroid from 'react-native-send-intent';

type ContactProps = {
  contactInfo: TypeContact;
};

export default function Contact({contactInfo}: ContactProps) {
  // console.log(contactInfo, '<<-- contactinfo');
  const name = contactInfo.displayName;
  const number = contactInfo.phoneNumbers[0]?.number;
  const navigation = useNavigation();
  const image2display = contactInfo.hasThumbnail ? {uri: contactInfo.thumbnailPath} : require('../assets/user.png');
  const handlePhoneCall = () => {
    SendIntentAndroid.sendPhoneCall(number);
  };
  return (
    <TouchableOpacity
      onPress={() => {
        // @ts-ignore
        navigation.navigate('specificContact', {
          contact: contactInfo,
        });
      }}>
      <View style={{marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
          <Image source={image2display} style={{height: 50, width: 50, borderRadius: 50}} resizeMode="cover" />
          <View>
            <Text
              numberOfLines={1}
              style={{color: '#000', fontWeight: '500', fontSize: 16, maxWidth: 200}}
              ellipsizeMode="middle">
              {name}
            </Text>
            <Text style={{color: '#8B8B8B', fontWeight: '500', fontSize: 14}}>{number}</Text>
          </View>
        </View>
        {number && (
          <Pressable onPress={handlePhoneCall}>
            <Image source={require('../assets/call.png')} style={{height: 30, width: 30}} />
          </Pressable>
        )}
      </View>
    </TouchableOpacity>
  );
}
