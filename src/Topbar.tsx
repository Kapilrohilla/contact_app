import {View, Text, Image, Pressable, TextInput, Button, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Menu} from 'react-native-paper';

export default function Topbar() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  return (
    <View style={{height: 60, flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center'}}>
      {isSearching ? (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <Pressable onPress={() => setIsSearching(false)}>
            <Image source={require('./assets/arrow_back_ios.png')} style={{height: 24, width: 24}} />
          </Pressable>
          <TextInput
            value={searchString}
            onChangeText={setSearchString}
            placeholder="Search..."
            placeholderTextColor={'#00000088'}
            style={{fontSize: 18, fontWeight: '500', padding: 0, color: '#00000088', paddingLeft: 2}}
          />
        </View>
      ) : (
        <Text style={{fontWeight: '500', fontSize: 20, color: 'black'}}>Contacts</Text>
      )}
      <View style={{flexDirection: 'row', gap: 10}}>
        <Pressable onPress={() => setIsSearching(!isSearching)}>
          <Image source={isSearching ? require('./assets/close.png') : require('./assets/search.png')} style={{height: 24, width: 24}} />
        </Pressable>
        <Menu
          style={styles.menuContainer}
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={<MenuAnchorBtn setShowMenu={setShowMenu} />}>
          <Menu.Item title="Sort" onPress={() => {}} />
        </Menu>
      </View>
    </View>
  );
}

const MenuAnchorBtn = ({setShowMenu}: {setShowMenu: React.Dispatch<boolean>}) => {
  return (
    <Pressable onPress={() => setShowMenu(true)}>
      <Image source={require('./assets/more_vert.png')} style={{height: 24, width: 24}} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: '#fff',
  },
  menuItem: {
    backgroundColor: '#fff',
  },
});
