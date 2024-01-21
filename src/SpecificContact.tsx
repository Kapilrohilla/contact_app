import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  ToastAndroid,
  Vibration,
} from 'react-native';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import type {Contact as TypeContact} from 'react-native-contacts';
import {deleteContact} from 'react-native-contacts';
import {removeContact} from './redux/slices/contactSlice';
import {useDispatch} from 'react-redux';

type specificContactNavProps = {
  route: any;
  navigation: any;
};
export default function SpecificContact({navigation, route}: specificContactNavProps) {
  const contact: TypeContact = route.params.contact;
  const image2display = contact.hasThumbnail ? {uri: contact.thumbnailPath} : require('./assets/user.png');
  const mobileNum = contact.phoneNumbers[0]?.number;
  const name = contact.displayName;
  const currentRecordId = contact?.recordID;
  const copyNumber = () => {
    Clipboard.setString(mobileNum);
    ToastAndroid.showWithGravity(`${mobileNum} copied`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    Vibration.vibrate(50, false);
  };

  const dispatch = useDispatch();
  const handleDeleteContact = async () => {
    try {
      //@ts-ignore
      const response = await deleteContact({recordID: currentRecordId});
      ToastAndroid.show('Contact delete successfully', 500);
      // @ts-ignore
      dispatch(removeContact(contact.recordID));
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView>
      {/* TopBar */}
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          padding: 10,
          gap: 10,
          alignItems: 'center',
          borderBottomColor: '#000',
          shadowColor: '#808080',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.0,
          elevation: 1,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={require('./assets/arrow_back_ios.png')} style={{height: 24, width: 24}} />
        </Pressable>
        <Text style={{fontWeight: '500', fontSize: 20, color: 'black'}}>{contact.displayName}</Text>
      </View>
      <View style={{marginVertical: 50}}>
        <View style={{flexDirection: 'row', position: 'relative', height: 150}}>
          <Image
            source={image2display}
            style={{
              height: 150,
              width: 150,
              borderRadius: 75,
              position: 'absolute',
              left: '50%',
              transform: [{translateX: -75}],
            }}
          />
          <View style={{flexDirection: 'row', position: 'absolute', right: 20, top: 35, gap: 10}}>
            <TouchableOpacity onPress={handleDeleteContact}>
              <Image source={require('./assets/delete.png')} style={{height: 24, width: 24, marginTop: 50}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('addContact', {role: 'Edit', contact: contact})}>
              <Image source={require('./assets/edit.png')} style={{height: 24, width: 24, marginTop: 50}} />
            </TouchableOpacity>
          </View>
          {/* <Image source={image2display} style={{height: 150, width: 150, borderRadius: 75}} /> */}
        </View>
        <Text style={{textAlign: 'center', color: '#000', fontSize: 22, fontWeight: '500'}}>{name}</Text>
        <View style={{marginHorizontal: 15}}>
          <View
            style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 36}}>
            <Pressable onLongPress={copyNumber}>
              <Text style={{color: '#000', fontWeight: '500', fontSize: 16}}>{mobileNum}</Text>
            </Pressable>
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#08AE2D',
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                  }}>
                  <Image source={require('./assets/call-white.png')} style={{height: 25, width: 25}} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(233, 173, 19, 1)',
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                  }}>
                  <Image source={require('./assets/message.png')} style={{height: 25, width: 25}} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* <View>
            <Text style={{color: '#000', opacity: 0.5, fontSize: 12, fontWeight: '600'}}>Call history</Text>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
}
