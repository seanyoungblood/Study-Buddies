import React, { useState, useEffect } from 'react';
import { Modal, Button, Text, Input, KeyboardAvoidingView } from 'native-base';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';
import { TextInput } from 'react-native';

/*
Implement the API part of this!!!!!
*/

const EditAccountModal = ({ isOpen, onClose, tabs, setFirst, setLast }) => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [userFirstName, setFirstName] = useState(' ');
    const [userLastName, setLastName] = useState(' ');
    const [userPhoneNumber, setPhoneNumber] = useState(' ');

    const app_name = 'cop-study-buddy-1000'

    function buildPath(route) {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }

    


    const [message, setMessage] = useState('');


    const doUser = async event => {
        console.log(userFirstName.length)

        let obj = {firstName:userFirstName,lastName:userLastName, username:currentUser.username,phone:userPhoneNumber};

        if(obj.firstName.length <= 1){
            obj.firstName = currentUser.firstName;
        }
        if(obj.lastName.length <= 1){
            obj.lastName = currentUser.lastName;
        }
        if(obj.phone.length <= 1){
            obj.phone = currentUser.phone;
        }

        let js = JSON.stringify(obj);
        console.log(obj);
        try {

            const response = await fetch(buildPath('api/editUser'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });


            let res = JSON.parse(await response.text());
            console.log(res)

            if (res._id <= 0) {
                console.log('User/Password combination incorrect');
            }
            else {
                let newUser = currentUser;
                newUser.firstName = obj.firstName;
                newUser.lastName = obj.lastName;
                newUser.phone = obj.phone;

                tabs[2].groups[1].description = obj.firstName;
                tabs[2].groups[2].description = obj.lastName;
                tabs[2].groups[3].description = obj.phone;

                setFirst(obj.firstName);
                setLast(obj.lastName);

                setCurrentUser(newUser);

                onClose();

                console.log(res);
                
            }
        }
        catch (e) {
            
            return;
        }
    };

    const handleCancelPress = () => {
        onClose();
      };



    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <KeyboardAvoidingView>
                <Modal.Content size="80" height="410">
                    <Modal.Header>Edit Account Details</Modal.Header>
                    <Modal.Body>

                        <Text>First Name:</Text>
                        <Input placeholder={currentUser.firstName} onChangeText={(fname) => setFirstName(fname)}></Input>

                        <Text>Last Name:</Text>
                        <Input placeholder={currentUser.lastName} onChangeText={(lname) => setLastName(lname)}></Input>

                        <Text>Phone Number:</Text>
                        <Input placeholder={currentUser.phone} keyboardType='numeric' onChangeText={(phone) => setPhoneNumber(phone)}></Input>

                        
                    </Modal.Body>
                    <Modal.Footer>
                    <Button.Group variant="ghost" space={2}>
                    <Button
                            onPress={handleCancelPress}>Cancel</Button>
                        <Button
                            onPress={doUser}>Submit</Button>
                    </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default EditAccountModal;
