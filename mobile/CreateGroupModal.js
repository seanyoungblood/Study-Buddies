import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Select, Input, Box, HStack, Center, Avatar, Flex, Spacer, VStack, Heading, Divider, Container, Button, Modal, KeyboardAvoidingView } from "native-base";
import CustomText2 from './CustomFont2';
import { Linking } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CoursePrefixInput from './CoursePrefixInput';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';

function CreateGroupModal({ isOpen, onClose }) {
  const [groupName, setGroupName] = useState('')
  const [objective, setObjective] = useState('')
  const [coursePrefix, setCoursePrefix] = useState('')
  const [courseNumber, setCourseNumber] = useState('')
  const [location, setLocation] = useState('')
  const [meetOn, setMeetOn] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState('')
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const createGroup = async () => {
    try {
        console.log("Registering group: " + groupName);
      const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/registerGroup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}`},
        body: JSON.stringify({
          groupName,
          objective,
          course: `${coursePrefix}${courseNumber}`,
          location,
          date: meetOn,
          time,
        }),
      })
      let res = JSON.parse(await response.text());
      console.log(res);
      const updatedUser = { ...currentUser };
                
      updatedUser.groupsIn.push(groupName);
      setCurrentUser(updatedUser);
      onClose()
    } catch (err) {
      setError(err.message)
    }
  }

  const join = async () => {
    try {
      console.log("Attempting to join " + groupName);
      const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/joinGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
          // add any additional headers you need, such as authorization headers
        },
        body: JSON.stringify({ groupName: groupName }),
      });

      var res = JSON.parse(await response.text());
      // if the API call is successful, update the UI or state as needed
      console.log(res);
      //joinAction(item.id);
      const updatedUser = { ...currentUser };
                
      updatedUser.groupsIn = res.groupsIn;
      setCurrentUser(updatedUser);
    } catch (error) {
      // handle errors if the fetch or API call fails
      console.log("Server error:" + error);
    }
  };

  const handleSubmit = () => {
    if (!groupName || !objective || !coursePrefix || !courseNumber || !location || !meetOn || !time) {
      setError('Please fill out all fields')
      return
    }
    createGroup()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <KeyboardAvoidingView behavior="padding">
        <Modal.Content size="80" height="410">
          <Modal.Header>Create a Group</Modal.Header>
          <Modal.Body>
            <Text>Name of Group:</Text>
            <Input w="100%" placeholder="Group Name" value={groupName} onChangeText={setGroupName} />
            <Text style={{ marginTop: '6%' }}>Objective:</Text>
            <Input w="100%" placeholder="Objective of Group" value={objective} onChangeText={setObjective} />
            <Text style={{ marginTop: '6%' }}>Course Prefix:</Text>
            <Input
              value={coursePrefix}
              onChangeText={setCoursePrefix}
              maxLength={3}
              placeholder="Course Prefix Ex. COP, COT"
            />
            <Text style={{ marginTop: '6%' }}>Course Number:</Text>
            <Input
              keyboardType="numeric"
              w="100%"
              placeholder="Course Number Ex. 4331"
              maxLength={4}
              value={courseNumber}
              onChangeText={setCourseNumber}
            />
            <Text style={{ marginTop: '6%' }}>Location:</Text>
            <Input
              w="100%"
              placeholder="Location Ex. John C. Hitt Library"
              value={location}
              onChangeText={setLocation}
            />
            <Text style={{ marginTop: '6%' }}>Meet on:</Text>
            <Input
              w="100%"
              placeholder="Days Ex. Monday and Thursday"
              value={meetOn}
              onChangeText={setMeetOn}
            />
            <Text style={{ marginTop: '6%' }}>Time:</Text>
            <Input
              w="100%"
              placeholder="Time Ex. 04:00PM"
              maxLength={7}
              value={time}
              onChangeText={setTime}
            />
            {error ? <Text style={{ color: 'red', marginTop: '6%' }}>{error}</Text> : null}
            </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button onPress={onClose}>Cancel</Button>
              <Button onPress={handleSubmit}>Create Group</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
  );
};

export default CreateGroupModal;
