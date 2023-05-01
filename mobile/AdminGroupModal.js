import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Select, Input, Box, HStack, Center, Avatar, Flex, Spacer, VStack, Heading, Divider, Container, Button, Modal, KeyboardAvoidingView } from "native-base";
import CustomText2 from './CustomFont2';
import { Linking } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CoursePrefixInput from './CoursePrefixInput';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';



function AdminGroupModal({ isOpen, onClose, group }) {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [groupName, setGroupName] = useState('')
  const [objective, setObjective] = useState(group.objective)
  const [course, setCourse] = useState(group.course)
  const [location, setLocation] = useState(group.location)
  const [meetOn, setMeetOn] = useState(group.date)
  const [time, setTime] = useState(group.time)

  const editGroup = async () => {
    {/*
    if(objective.length == 1){
        setObjective(group.objective);
    }
    if(course.length <= 1){
        setCourse(group.course);
    }
    if(location.length <= 1){
        setLocation(group.location);
    }
    if(meetOn.length <= 1){
        setMeetOn(group.date);
    }
    if(time.length <= 1){
        setTime(group.time);
    }
*/}
    try {
        console.log("Editing group: " + groupName);
      const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/editGroup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}`},
        body: JSON.stringify({
          groupName:group.groupName,
          objective:objective,
          course:course,
          location:location,
          date: meetOn,
          time:time,
        }),
      })
      let res = JSON.parse(await response.text());
      console.log(res);
      onClose()
    } catch (err) {
      console.log(err.message)
    }
  }

  const leave = async () => {
    try {
      console.log("Attempting to leave " + group.groupName);
      const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/leaveGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
          // add any additional headers you need, such as authorization headers
        },
        body: JSON.stringify({ groupName: group.groupName }),
      });

      var res = JSON.parse(await response.text());
      // if the API call is successful, update the UI or state as needed
      console.log(res);
      //joinAction(item.id);
      const updatedUser = { ...currentUser };
                
      updatedUser.groupsIn = updatedUser.groupsIn.filter(e => e !== group.groupName);
      //^Replace with actual get user function here!!! sync with server!!!!
      console.log(updatedUser.groupsIn);
      setCurrentUser(updatedUser);
      onClose();
    } catch (error) {
      // handle errors if the fetch or API call fails
      console.log("Server error:" + error);
    }
  };

  const deleteGroup = async () => {
    leave();
    try {
        console.log("Deleteing group: " + group.groupName);
      const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/:id/deleteGroup', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}`},
        body: JSON.stringify({
          groupName:group.groupName,
          username:currentUser.username
        }),
      })
      let res = response.text;
      console.log(res);
      const updatedUser = { ...currentUser };
                
      updatedUser.groupsIn = updatedUser.groupsIn.filter(e => e !== group.groupName);
      //^Replace with actual get user function here!!! sync with server!!!!
      console.log(updatedUser.groupsIn);
      setCurrentUser(updatedUser);
      onClose()
    } catch (err) {
      console.log(err.message)
    }
  }


    const reviews = group.reviews || []; // Make sure reviews array exists

    const averageReview = reviews.length > 0 ? reviews.reduce((a, b) => a + b, 0) / reviews.length : 0;


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <KeyboardAvoidingView behavior="padding">
        <Modal.Content size="80" height="410">
          <Modal.Header><Text style={styles.title}>{group.groupName}{" (Leader)"}</Text></Modal.Header>
          <Modal.Body>
          
          <Text>Course:</Text>
            <Input
              value={course}
              onChangeText={setCourse}
              maxLength={8}
              placeholder={group.course}
            />
            <Text style={{ marginTop: '6%' }}>Objective:</Text>
            <Input
              value={objective}
              onChangeText={setObjective}
              maxLength={8}
              placeholder={group.objective}
            />
            <Text style={{ marginTop: '6%' }}>Location:</Text>
            <Input
              w="100%"
              placeholder={group.location}
              value={location}
              onChangeText={setLocation}
            />
            <Text style={{ marginTop: '6%' }}>Meet on:</Text>
            <Input
              w="100%"
              placeholder={group.date}
              value={meetOn}
              onChangeText={setMeetOn}
            />
            <Text style={{ marginTop: '6%' }}>Time:</Text>
            <Input
              w="100%"
              placeholder={group.time}
              maxLength={7}
              value={time}
              onChangeText={setTime}
            />
            </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button onPress={onClose}>Close</Button>
              <Button onPress={deleteGroup}>Delete</Button>
              <Button onPress={editGroup}>Edit</Button>
              {/* MAKE THE BUTTONS FUNCTIONAL AND ALLOW EDIT TO TAKE IN BLANK SPACES WITHOUT DISRUPTING THE CONTENT */}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
        </KeyboardAvoidingView>
      </Modal>
  );
};

const styles = StyleSheet.create({
    listContainer: {
      paddingVertical: 0,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#fff',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#ccc',
    },
    image: {
      width: 64,
      height: 64,
      marginRight: 16,
    },
    textContainer: {
      width:'100%'
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: '#666',
    },
    rightAction: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    leftAction: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    actionTextLeft: {
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 300
    },
    actionTextRight: {
      color: '#fff',
      fontWeight: 'bold',
      marginRight: 300
    },
  });

export default AdminGroupModal;
