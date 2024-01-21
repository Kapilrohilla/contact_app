import {View, Text, FlatList, PermissionsAndroid, Linking, ToastAndroid} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Topbar from './Topbar';
import NoContactFound from './components/NoContactFound';
import Fab from './components/Fab';
import Contact from './components/Contact';
import Contacts from 'react-native-contacts';
import type {Contact as TypeContact} from 'react-native-contacts';

export default function AllContact() {
  const [isContactPermissionGranted, setIsContactPermissionGranted] = useState(false);
  const [contacts, setContacts] = useState<TypeContact[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const readContactPermission = () => {
    // checking if the permission is already granted or not
    PermissionsAndroid.check('android.permission.READ_CONTACTS')
      .then(r => {
        if (!r) {
          // requesting READ-CONTACTS permission
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: 'Contacts',
            message: 'This app is like to read you mobile number',
            buttonPositive: 'Ok',
          }).then(res => {
            console.log('request: ' + res);
            if (res === 'never_ask_again' || res === 'denied') {
              ToastAndroid.showWithGravity(
                'Contact Permission is required to work properly',
                2000,
                ToastAndroid.BOTTOM,
              );
              setTimeout(() => {
                Linking.openSettings();
              }, 2000);
            } else {
              ToastAndroid.showWithGravity(`Permission ${res}`, 1000, ToastAndroid.BOTTOM);
              setIsContactPermissionGranted(true);
            }
          });
        } else {
          ToastAndroid.showWithGravity(`Permission already granted`, 1000, ToastAndroid.BOTTOM);
          setIsContactPermissionGranted(true);

          Contacts.getAll().then((contacts: TypeContact[]) => {
            console.log(contacts);
            setContacts(contacts);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    readContactPermission();
  }, []);
  const filteredData = searchString
    ? contacts.filter(contact => new RegExp(searchString, 'i').test(contact.displayName))
    : contacts;
  return (
    <View style={{flex: 1}}>
      <Topbar searchString={searchString} setSearchString={setSearchString} />
      {(isContactPermissionGranted && contacts.length > 0) || <NoContactFound />}
      {(isContactPermissionGranted || contacts.length > 0) && (
        <View style={{paddingHorizontal: 20, marginTop: 20}}>
          <FlatList
            data={filteredData}
            renderItem={({item}) => {
              return <Contact contactInfo={item} />;
            }}
            keyExtractor={(item: TypeContact) => item.recordID}
          />
        </View>
      )}
      <Fab />
    </View>
  );
}
