import { StyleSheet, View, Image, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import CustomText from './CustomFont';
import { Alert, Text, Center, VStack, HStack, IconButton, Box, CloseIcon, Heading, Collapse, KeyboardAvoidingView } from "native-base";
import InvalidFieldAlert from './InvalidFieldAlert';
import VerifyUserModal from './VerifyUserModal';

const RegisterPage = ({ navigation, route }) => {
  const [regUser, setRegUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regFirstName, setRegFirst] = useState("");
  const [regLastName, setRegLast] = useState("");
  const [regPhone, setRegPhone] = useState("");

  const [show, setShow] = React.useState(false);
  const [showVer, setShowVer] = React.useState(false);
  const [errorMessage, setError] = React.useState(" ");

  function containsNonAlphabetCharacters(str) {
    // Regular expression to match non-alphabet characters
    const regex = /[^a-zA-Z]/g;
    
    // Test the string for non-alphabet characters
    return regex.test(str);
  }

  function isValidKnightsEmail(email) {
    // Regular expression to match email with a knights.ucf.edu domain
    const regex = /^[a-zA-Z0-9._%+-]+@knights\.ucf\.edu$/;
    
    // Test the email string against the regular expression
    return regex.test(email);
  }

  function checkObjectProperties(obj) {
    // Loop through the properties of the object
    for (let key in obj) {
      // Check if the property value is an empty string
      if (obj.hasOwnProperty(key) && obj[key].trim() === '') {
        return false;
      }
    }
    // All properties are non-empty strings
    return true;
  }

  function isPasswordComplex(password) {
    // Regular expressions to match different character types
    const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    
    // Test the password against the regular expressions
    return specialRegex.test(password) && 
           uppercaseRegex.test(password) &&
           lowercaseRegex.test(password) &&
           numberRegex.test(password);
  }



  const doRegister = async event => {
      
    const app_name = 'cop-study-buddy-1000'
    function buildPath(route) {
      //if (process.env.NODE_ENV === 'production')
      //{
      return 'https://' + app_name + '.herokuapp.com/' + route;
      //}
      //else
      //{
      //    return 'http://localhost:5000/' + route;
      //}
    }

    event.preventDefault();

    var obj = { firstName: regFirstName, lastName: regLastName, username: regUser, password: regPass, phone: regPhone, email: regEmail};

    if(!checkObjectProperties(obj)){
      console.log("Invalid");
      setError("Please fill out all fields");
      setShow(true);
      return;
    }
    if(containsNonAlphabetCharacters(regUser)){
      console.log("Invalid");
      setError("Invalid Username: Please Use Alphabet Only");
      setShow(true);
      return;
    }
    if(containsNonAlphabetCharacters(regFirstName)){
      console.log("Invalid");
      setError("Invalid First Name: Please Use Alphabet Only");
      setShow(true);
      return;
    }
    if(containsNonAlphabetCharacters(regLastName)){
      console.log("Invalid");
      setError("Invalid Last Name: Please Use Alphabet Only");
      setShow(true);
      return;
    }
    if(!isPasswordComplex(regPass)){
      console.log("Invalid");
      setError("Invalid Password: Must have at least\n1 Upper, 1 Lower, and 1 Special Character");
      setShow(true);
      return;
    }


    //Check all the values
    //If value isn't value then () => setShow(true);

    var js = JSON.stringify(obj);
    console.log("Attempting to register the following object:\n" +
      "Username:" + obj.username + "   Password:" + obj.password + "   First name:" + obj.firstName + "   Last name:" + obj.lastName + "\n\n");

    try {
      const response = await fetch(buildPath('api/register'),
        { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

      var res = JSON.parse(await response.text());

      if (res.id <= 0) {
        console.log('Server Error');
        //Alert.alert("The information you entered is not valid");
      }
      else {

        //localStorage.setItem('user_data', JSON.stringify(user));
        console.log('User:' + obj.username + ' has been successfully registered\n\n');
        handleVerPress();
      }
    }
    catch (e) {
      console.log(e);

      return;
    }
  };

  const handleVerPress = () => {
    setShowVer(true);
  };

  const handleVerClose = () => {
    setShowVer(false);
  };


  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container} h={{
        lg: "auto"
      }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View>
          <CustomText style={{ width: "100%", fontSize: 42, paddingRight: "5%", paddingBottom: "5%", marginTop: '20%', marginBottom: '10%' }}>Study Buddies</CustomText>
        </View>
        <TextInput
          onChangeText={(reguser) => setRegUser(reguser)}
          style={styles.textInput}
          placeholder={"Username"}
        />
        <TextInput
          onChangeText={(regpass) => setRegPass(regpass)}
          style={styles.passwordInput}
          placeholder={"Password"}
          secureTextEntry={true}
        />
        <TextInput
          onChangeText={(regemail) => setRegEmail(regemail)}
          style={styles.textInput}
          placeholder={"Knight's Email"}
        />
        <TextInput
          onChangeText={(regphone) => setRegPhone(regphone)}
          style={styles.textInput}
          placeholder={"Phone Number"}
          keyboardType="numeric"
          maxLength={10}
        />
        <TextInput
          onChangeText={(regfirstname) => setRegFirst(regfirstname)}
          style={styles.textInput}
          placeholder={"First Name"}
        />
        <TextInput
          onChangeText={(reglastname) => setRegLast(reglastname)}
          style={styles.textInput}
          placeholder={"Last Name"}
        />

        <View style={styles.buttonContainer}>
          <Button
            
            title='Back'
            //onPress={() =>
            //  navigation.navigate('LoginPage')}
            onPress={() => navigation.navigate('LoginPage')}
            color="#000000"
            accessibilityLabel="Press to go back to login page"
          >Back</Button>
          <Button
            
            title='Submit'
            onPress={doRegister}
            color="#000000"
            accessibilityLabel="Press to Register"
          >Submit</Button>
        </View>

      </KeyboardAvoidingView>

      <InvalidFieldAlert show={show} setShow={setShow} errorMessage={errorMessage} setError={setError}></InvalidFieldAlert>
      <Center>
        <VerifyUserModal navigation={navigation} isOpen={showVer} onClose={handleVerClose} regUser={regUser} ></VerifyUserModal>
      </Center>
    </View>
  );
};

export default RegisterPage;

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
    width: '100%',
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
    marginTop: '23%'
  },

  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
    width: '80%',
    marginBottom: '3%'
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
    marginBottom: '20%',
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  button: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%'
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});