
import { StyleSheet, Text, View, Image, Alert, Button } from 'react-native';
import { useState, useEffect } from 'react';
import SwipeableFlatList from './SwipeableFlatList';
import HeaderLogo from './HeaderLogo';
import Searchbar from './Searchbar';
import { Checkbox, Select, CheckIcon } from 'native-base';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';


const SearchPage = ({navigation, route}) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  
  const [items, setItems] = useState([]);

  const [text, setText] = useState('');

  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    setSelectedValue('');
  }, [currentUser.classesTaking]);

  useEffect(() => {
    setText(selectedValue);
  }, [selectedValue]);

  const handleJoin = (item) => {
    // perform action when item is joined
    console.log(`Joined ${item.title}`);
  };

  const handleIgnore = (item) => {
    // perform action when item is ignored
    console.log(`Ignored ${item.title}`);
  };

  const handleResults = (results) => {
    setItems(results);
  };

  return (
    <View style={{ height: '100%', backgroundColor: 'white', alignItems:'center' }}>
      <HeaderLogo />
      <Searchbar onResults={handleResults} text={text} setText={setText} />
      
      <Select selectedValue={selectedValue} onValueChange={itemValue => setSelectedValue(itemValue)} minWidth="350" placeholder="Select a class" _selectedItem={{
        
        endIcon: <CheckIcon size={5} />
      }} mt="1">
              <Select.Item label="Select an option" value="" />
              {currentUser.classesTaking.map((option, index) => (
                <Select.Item label={option} value={option} key={index} />
              ))}
            </Select>
      
      <SwipeableFlatList
        data={items}
        setData={setItems}
        joinAction={handleJoin}
        ignoreAction={handleIgnore}
      />
    </View>
  );
};

export default SearchPage;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      height: '100%',
      width: '100%',
    },
    subcontainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '80%',
    },
  
    logo: {
      width: '100%',
      height: '30%',
      alignItems: 'center'
    },
  
    logoimg: {
      width: '100%',
      height: '35%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    usernameInput: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      padding: 10,
      width: '100%',
    },
  
    passwordInput: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      padding: 10,
      width: '100%',
      marginTop: '3%',
    },
  
    buttonContainer: {
      flexDirection: 'row',
      marginBottom: '30%',
      marginTop: 5,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
  
    button: {
      backgroundColor: '#007aff',
      borderRadius: 5,
      padding: 10,
      marginHorizontal: 10,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });