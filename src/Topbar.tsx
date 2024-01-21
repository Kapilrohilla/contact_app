import {View, Text, Image, Pressable, TextInput, Button, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {Menu} from 'react-native-paper';

type TopBarProps = {
  searchString: string;
  setSearchString: React.Dispatch<string>;
};

export default function Topbar({searchString, setSearchString}: TopBarProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const handleToggleSearch = () => {
    if (isSearching) {
      setIsSearching(false);
      setSearchString('');
    } else {
      setIsSearching(true);
    }
  };
  return (
    <View
      style={{height: 60, flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center'}}>
      {isSearching ? (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <Pressable onPress={() => setIsSearching(false)}>
            <Image source={require('./assets/arrow_back_ios.png')} style={{height: 24, width: 24}} />
          </Pressable>
          <TextInput
            value={searchString}
            autoCapitalize="none"
            autoFocus={true}
            autoComplete="cc-name"
            inputMode="search"
            onChangeText={setSearchString}
            placeholder="Search..."
            placeholderTextColor={'#00000088'}
            style={styles.inputStyle}
          />
        </View>
      ) : (
        <Text style={{fontWeight: '500', fontSize: 20, color: 'black'}}>Contacts</Text>
      )}
      <View style={{flexDirection: 'row', gap: 10}}>
        <Pressable onPress={handleToggleSearch}>
          <Image
            source={isSearching ? require('./assets/close.png') : require('./assets/search.png')}
            style={{height: 24, width: 24}}
          />
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
  inputStyle: {
    fontSize: 18,
    fontWeight: '500',
    padding: 0,
    color: '#00000088',
    paddingLeft: 2,
    maxWidth: '70%',
    width: '70%',
  },
});
