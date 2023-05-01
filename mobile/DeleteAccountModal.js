import React, { useState, useEffect } from 'react';
import { Modal, Button, Text } from 'native-base';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';

const DeleteAccountModal = ({ isOpen, onClose, navigation }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [text, setText] = useState('Are you sure you want to delete your account?');
  const [stage, setStage] = useState(0);

  const app_name = 'cop-study-buddy-1000'

    function buildPath(route) {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }

    


    const [message, setMessage] = useState('');


    const doDelete = async event => {

        var obj = {username:currentUser.username};
        var js = JSON.stringify(obj);
        console.log(obj);
        try {
            const response = await fetch(buildPath('api/:id/deleteUser'),
                { method: 'DELETE', body: js, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}`} });


            let res = JSON.parse(await response.text());
            console.log(res)

            if (res._id <= 0) {
                console.log('User/Password combination incorrect');
            }
            else {

                onClose();

                navigation.navigate('LoginPage');

                console.log(currentUser);
                
            }
        }
        catch (e) {
            
            return;
        }
    };

  useEffect(() => {
    if (!isOpen) {
      setText('Are you sure you want to delete your account?');
      setStage(0);
    }
  }, [isOpen]);

  const handleYesPress = () => {
    if (stage === 0) {
      setText('Are you sure you\'re sure?');
      setStage(1);
    } else if (stage === 1) {
      setText('Say \'I am a barista\' to confirm your account deletion');
      setStage(2);
    }
    else if(stage === 2){

    }
  };

  const handleNoPress = () => {
    if (stage === 2) {
      setText('Account deletion canceled.');
      setStage(0);
    }
    onClose();
  };

  const handleCancelPress = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>Confirm Account Deletion</Modal.Header>
        <Modal.Body>
          <Text>{text}</Text>
        </Modal.Body>
        <Modal.Footer>
          {stage === 2 ? (
            <>
              <Button onPress={handleNoPress} mr={2}>
                <Text>No</Text>
              </Button>
              <Button onPress={doDelete} mr={2}>
                <Text>I am a barista</Text>
              </Button>
            </>
          ) : (
            <>
              <Button onPress={handleCancelPress} mr={2}>
                <Text>Cancel</Text>
              </Button>
              <Button onPress={handleYesPress} mr={2}>
                <Text>Yes</Text>
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteAccountModal;
