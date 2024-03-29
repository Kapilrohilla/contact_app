import {View, Text, TextInput, Pressable, Image, TouchableOpacity, ScrollView, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import {addContact, editExistingContact, getAll, updateContact} from 'react-native-contacts';
import type {Contact} from 'react-native-contacts';
import {useDispatch} from 'react-redux';
import {fixContact, insertContact} from './redux/slices/contactSlice';
import type {fixContactPayload} from './redux/slices/contactSlice';
import SendIntentAndroid from 'react-native-send-intent';

export default function AddEditContact({navigation, route}: {navigation: any; route: any}) {
  const pageRole: 'Add' | 'Edit' = route.params.role;
  const contactDetail: Contact = route.params?.contact;
  let prevName: string = contactDetail?.displayName || '';
  let prevPhone: string = contactDetail?.phoneNumbers[0]?.number || '';
  const mobileLabel = contactDetail?.phoneNumbers[0].label || '';
  const currentRecordId = contactDetail?.recordID;
  const dispatch = useDispatch();

  if (prevPhone) {
    // replacing spaces from number
    prevPhone = prevPhone.replaceAll(' ', '');

    // replacing the country-code from number
    if (prevPhone.slice(0, 3) === '+91') {
      prevPhone = prevPhone.slice(3);
    } else if (prevPhone[0] === '+') {
      prevPhone = prevPhone.slice(1);
    }
    // console.log(prevPhone, 1);
  }
  const [name, setName] = useState(prevName);
  const [phone, setPhone] = useState(prevPhone);

  const handleSubmit = async () => {
    const finalContactForm = {
      givenName: name,
      phoneNumbers: [
        {
          label: 'mobile',
          number: phone,
        },
      ],
    };
    if (pageRole === 'Add') {
      if (name && phone) {
        const newContact = await addContact(finalContactForm);
        // @ts-ignore
        dispatch(insertContact(newContact));
        ToastAndroid.show(`${phone} number saved successfully`, 1000);
        navigation.goBack();
      }
    } else {
      const payloadData: fixContactPayload = {
        recordID: currentRecordId,
        updatedContact: {
          name: name,
          phone: {
            label: mobileLabel,
            number: phone,
          },
        },
      };

      dispatch(fixContact(payloadData));
      const newContact: Contact = {
        ...contactDetail,
        ...payloadData.updatedContact,
      };
      console.log(newContact);
      try {
        const response = await editExistingContact(newContact);
        console.log(response, '<< -- updated response');
        navigation.goBack();
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.warn(err.message);
        } else {
          console.error(err);
        }
      }
      return;
    }
  };
  return (
    <>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          padding: 10,
          gap: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
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
        <View style={{flexDirection: 'row', gap: 20}}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={require('./assets/arrow_back_ios.png')} style={{height: 24, width: 24}} />
          </Pressable>
          <Text style={{fontWeight: '500', fontSize: 20, color: 'black'}}>{pageRole}</Text>
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          <Image
            source={require('./assets/check.png')}
            style={{height: 20, width: 20, marginRight: 10}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{padding: 15}}>
        <View style={{gap: 5, marginVertical: 10}}>
          <Text style={{fontWeight: '400', fontSize: 16, color: '#000'}}>Name</Text>
          <TextInput
            placeholder="Enter name"
            placeholderTextColor={'#9e9e9e'}
            autoFocus={true}
            value={name}
            onChangeText={newName => setName(newName)}
            autoComplete="cc-name"
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#000',
              borderWidth: 1,
              borderColor: '#9e9e9e',
              borderRadius: 5,
              paddingHorizontal: 10,
            }}
          />
        </View>
        <View style={{gap: 5, marginVertical: 10}}>
          <Text style={{fontWeight: '400', fontSize: 16, color: '#000'}}>Phone number</Text>
          <TextInput
            placeholder="__________"
            placeholderTextColor={'#9e9e9e'}
            maxLength={10}
            numberOfLines={1}
            value={phone}
            onChangeText={newNum => setPhone(newNum)}
            autoComplete="cc-name"
            keyboardType="numeric"
            style={{
              fontWeight: '400',
              fontSize: 16,
              color: '#000',
              borderWidth: 1,
              borderColor: '#9e9e9e',
              borderRadius: 5,
              paddingHorizontal: 10,
              letterSpacing: 2,
            }}
          />
        </View>
      </ScrollView>
    </>
  );
}
