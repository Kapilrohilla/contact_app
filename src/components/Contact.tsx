import {View, Text, Image} from 'react-native';
import React from 'react';
import type {Contact as TypeContact} from 'react-native-contacts';

type ContactProps = {
  contactInfo: TypeContact;
};

export default function Contact({contactInfo}: ContactProps) {
  // console.log(contactInfo, '<<-- contactinfo');

  const image2display = contactInfo.hasThumbnail ? {uri: contactInfo.thumbnailPath} : require('../assets/user.png');
  return (
    <View style={{marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
        <Image source={image2display} style={{height: 50, width: 50, borderRadius: 50}} resizeMode="cover" />
        <View>
          <Text style={{color: '#000', fontWeight: '500', fontSize: 16}}>{contactInfo.displayName}</Text>
          <Text style={{color: '#8B8B8B', fontWeight: '500', fontSize: 14}}>{contactInfo.phoneNumbers[0]?.number}</Text>
        </View>
      </View>
      <Image source={require('../assets/call.png')} style={{height: 30, width: 30}} />
    </View>
  );
}
