
import { StyleSheet, Text, View, Image, Alert, Button } from 'react-native';
import HeaderLogo from './HeaderLogo';
import Searchbar from './Searchbar';
import { Divider } from 'native-base';


const StudyPage = ({navigation, route}) => {
    return (
      <View style={{height:"100%", backgroundColor:"white"}}>
        <HeaderLogo></HeaderLogo>
        <View>
          
        </View>
      </View>
    );
  };
  
  export default StudyPage;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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