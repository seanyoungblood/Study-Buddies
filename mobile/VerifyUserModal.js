import React, { useState, useEffect } from 'react';
import { Modal, Button, Text, Input, KeyboardAvoidingView } from 'native-base';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';
import { TextInput } from 'react-native';



const VerifyUserModal = ({ navigation, isOpen, onClose, regUser }) => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [username, setUsername] = useState(' ');
    const [verificationCode, setVerificationCode] = useState(' ');
    const [message2user, setMessage2User] = useState("A verification email has been sent to your email.");

    const doVerify = async event => 
    {

        const app_name = 'cop-study-buddy-1000'
        function buildPath(route){
                return 'https://' + app_name +  '.herokuapp.com/' + route;
        }

        var obj = {username:username, codeInput:verificationCode};
        var js = JSON.stringify(obj);
        console.log(obj);

        try
        {    
            const response = await fetch(buildPath('api/verifyUser'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if(!res._id)
            {
                setMessage2User('Verification Code Error. Please try again.');
            }
            else
            {

                console.log(currentUser);
                console.log('Verification Success');

                navigation.navigate('LoginPage');
            }
        }
        catch(e)
        {
            console.log(e.toString());
            return;
        }    
     };

    

    



    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <KeyboardAvoidingView>
                <Modal.Content size="80" height="400">
                    <Modal.Header>Verify Account</Modal.Header>
                    <Modal.Body>
                        <Text style={{marginBottom:10}}>{message2user}</Text>

                        <Text>Username:</Text>
                        <Input placeholder={"Username"} onChangeText={(fname) => setUsername(fname)}></Input>

                        <Text style={{marginTop:10}}>Verification code:</Text>
                        <Input keyboardType='numeric' placeholder={"Verification code"} onChangeText={(lname) => setVerificationCode(lname)}></Input>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button.Group variant="ghost" space={2}>
                        <Button
                            onPress={doVerify}>Verify</Button>
                    </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default VerifyUserModal;
