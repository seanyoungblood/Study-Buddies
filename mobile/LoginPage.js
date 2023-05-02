import { StyleSheet, Text, View, Image, Alert,TextInput, Button } from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomFont';
import { Center, VStack, HStack, IconButton, Box, CloseIcon, Heading, Collapse, KeyboardAvoidingView } from "native-base";
import { AuthContext } from './LoginContext';
import { useContext } from 'react';


const app_name = 'cop-study-buddy-1000'

    function buildPath(route)
    {
        //if (process.env.NODE_ENV === 'production')
        //{
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        //}
        //else
        //{
        //    return 'http://localhost:5000/' + route;
        //}
    }

    
    
    
       

const LoginPage = ({navigation, route}) => {
  const [user, setUser] = useState("");
  const [pass, setPassword] = useState("");
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const [message2user, setmessage2user] = useState("");


  const doLogin = async event => 
  {
      event.preventDefault();

      var obj = {username: user,password: pass};
      var js = JSON.stringify(obj);
      console.log(obj);
      try
      {    
        const [ username, password ] = js;

        console.log("Attempting to login the following object:\n" + 
        "Username:" + obj.username + "   Password:" + obj.password + "\n\n");

          const response = await fetch(buildPath('api/login'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
          

          var res = JSON.parse(await response.text());
          console.log(res)

          if(!res._id)
          {
              setmessage2user('User/Password combination incorrect');
          }
          else
          {
              //var user1 = {firstName:res.firstName,lastName:res.lastName,id:res._id}
              //localStorage.setItem('user_data', JSON.stringify(user));
              
              console.log('User:' + obj.username + ' has been successfully Logged in\n\n');
              setCurrentUser(res);

              navigation.navigate('Home');


              
          }
      }
      catch(e)
      {
        setmessage2user('User/Password combination incorrect');
          return;
      }    
  };

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} h={{
      lg: "auto"
    }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View>
        <CustomText style={{ width: "100%", fontSize: 42, paddingRight: "5%", paddingBottom: "5%", marginTop: '40%', marginBottom: '10%' }}>Study Buddies</CustomText>
      </View>
      <TextInput
        onChangeText={(reguser) => setUser(reguser)}
        style={styles.usernameInput}
        placeholder={"Username"}
      />
      <TextInput
        onChangeText={(regpass) => setPassword(regpass)}
        style={styles.passwordInput}
        placeholder={"Password"}
        secureTextEntry={true}
      />
      

      <View style={styles.buttonContainer}>
        <Button
          variant={'unstyled'}
          size="lg"
          title='Login'
          //onPress={() =>
          //  navigation.navigate('LoginPage')}
          onPress={doLogin}
          color="#000000"
          accessibilityLabel="Press to login"
        >Login</Button>
        <Button
          variant={'unstyled'}
          size="lg"
          title='Register'
          onPress={() => navigation.navigate('RegisterPage')}
          color="#000000"
          accessibilityLabel="Press to Register"
        >Register</Button>
       
      </View>

      <Text style={{color:'red'}}>{message2user}</Text>
      
    </KeyboardAvoidingView>
  <Text style={{marginBottom:"2%"}}>Forgot your password? <Text onPress={ () => Alert.alert('Have you tried turning it off and back on?') } style = {{ color: '#00008B' }}>Click here</Text></Text>
  <Text style={{marginBottom:"10%"}}>Not interested in studying? <Text onPress={ () => navigation.navigate('BaristaGPT') } style = {{ color: '#00008B' }}>BaristaGPT</Text></Text>

  </View>
        
    );
  };
  
  export default LoginPage;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80%',
      width: '100%',
    },
    subcontainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: '60%',
      width: '80%',
      },
  
    logo: {
      width: '100%',
      height: '30%',
      alignItems: 'center',
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
      width: '80%',
      marginBottom: '3%',
    },
  
    passwordInput: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 4,
      padding: 10,
      width: '80%',
      marginBottom: '3%',
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