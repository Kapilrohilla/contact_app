import {View, Text, FlatList, PermissionsAndroid, Linking, ToastAndroid} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Topbar from './Topbar';

export default function AllContact() {
  const [isContactPermissionGranted, setIsContactPermissionGranted] = useState(false);

  const readContactPermission = () => {
    // checking if the permission is already granted or not
    PermissionsAndroid.check('android.permission.READ_CONTACTS')
      .then(r => {
        if (r === false) {
          console.log('check: ' + r);
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
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    readContactPermission();
  }, []);

  return (
    <View>
      <Topbar />
    </View>
  );
}
