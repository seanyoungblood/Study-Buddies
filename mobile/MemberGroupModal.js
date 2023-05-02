import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Select, Input, Box, HStack, Center, Avatar, Flex, Spacer, VStack, Heading, Divider, Container, Button, Modal, KeyboardAvoidingView } from "native-base";
import CustomText2 from './CustomFont2';
import { Linking } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CoursePrefixInput from './CoursePrefixInput';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';

function MemberGroupModal({ isOpen, onClose, group }) {

    const [yourRating, setYourRating] = useState("");
    const reviews = group.reviews || []; // Make sure reviews array exists

    let averageReview = reviews.length > 0 ? reviews.reduce((a, b) => Number(a) + Number(b), 0) / reviews.length : 0;

    const { currentUser, setCurrentUser } = useContext(AuthContext);
    

  const leave = async () => {
    try {
      console.log("Attempting to leave " + group.groupName);
      const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/:id/leaveGroup', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
          // add any additional headers you need, such as authorization headers
        },
        body: JSON.stringify({ groupName: group.groupName,
            username:currentUser.username
        }),
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

  const rate = async () => {
    try {
      console.log("Attempting to edit rating of " + group.groupName + "with a rating of: " + yourRating);
      const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/editRating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
          // add any additional headers you need, such as authorization headers
        },
        body: JSON.stringify({ username: currentUser.username, groupName: group.groupName, rating:yourRating }),
      });

      var res = JSON.parse(await response.text());
      // if the API call is successful, update the UI or state as needed
      console.log(res);
      //joinAction(item.id);
      onClose();
    } catch (error) {
      // handle errors if the fetch or API call fails
      console.log("Server error:" + error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <KeyboardAvoidingView behavior="padding">
        <Modal.Content size="80" height="410">
          <Modal.Header><Text style={styles.title}>{group.groupName}{" (Member)"}</Text></Modal.Header>
          <Modal.Body>
          
        <Text style={styles.description}>Course: {group.course}</Text>
        <Text style={styles.description}>Objective: {group.objective}</Text>
        <Text style={styles.description}>Date: {group.date}</Text>
        <Text style={styles.description}>Time: {group.time}</Text>
        <Text style={styles.description}>Location: {group.location}</Text>
        <Text style={styles.description}>Members: {group.members}</Text>
        <Text style={styles.description}>Average rating: {averageReview} ({reviews.length} reviews)</Text>
        <View style={{top:10}}>
        <Text style={styles.description}>Your Rating:</Text>
        <Input
              w="100%"
              placeholder={"Your rating out of 5"}
              keyboardType='numeric'
              maxLength={1}
              value={yourRating}
              onChangeText={setYourRating}
            />
        </View>
        


            </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button onPress={onClose}>Close</Button>
              <Button onPress={leave}>Leave</Button>
              <Button onPress={rate}>Rate</Button>
              {/* MAKE THE BUTTONS FUNCTIONAL */}
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

export default MemberGroupModal;
