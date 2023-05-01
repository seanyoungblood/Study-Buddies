import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Select, Input, Box, HStack, Center, Avatar, Flex, Spacer, VStack, Heading, Divider, Container, Button, Modal, KeyboardAvoidingView } from "native-base";
import CustomText2 from './CustomFont2';
import { Linking } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CoursePrefixInput from './CoursePrefixInput';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';
import CreateGroupModal from './CreateGroupModal';

const HeaderLogo = () => {
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeineckerOpen, setLeineckerOpen] = useState(false);
    const [coursePrefix, setCoursePrefix] = useState('');

  const handleGroup = () => {
    setIsModalOpen(true);
  };

  const handleProfile = () => {
    setLeineckerOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseLeinecker = () => {
    setLeineckerOpen(false);
  };

  const [text, setText] = useState('');

  const handleTextChange = (inputText) => {
    // Force caps
    const capsText = inputText.toUpperCase();

    setText(capsText);
  };


  return (
    <View style={{ height: "10%", width: "100%", backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", width: "100%", height: "60%", justifyContent: "space-around", marginTop: "3%" }}>
        {/* Profile picture at top left */}
        <TouchableOpacity style={styles.logoImg1} onPress={handleProfile}>
          <Image style={{ height: "100%", width: "100%", borderRadius: 25 }} source={require('./assets/leinecker.jpg')} />
        </TouchableOpacity>

        {/* Logo in the middle */}
        <CustomText2 style={{ fontSize: 22, fontFamily: 'NatureBeauty', height: '100%' }}>Study Buddies</CustomText2>

        {/* Notification button on the right */}
        <TouchableOpacity style={styles.logoImg2} onPress={handleGroup}>
          <Image style={{ height: "100%", width: "100%", borderRadius: 25 }} source={require('./assets/add.png')} />
        </TouchableOpacity>
      </View>
      <Divider style={{ marginTop: '3%' }}></Divider>

      {/* Modal */}
      <Center>
      <CreateGroupModal isOpen={isModalOpen} onClose={handleCloseModal}></CreateGroupModal>
      </Center>
      <Center>
      <Modal isOpen={isLeineckerOpen} onClose={handleCloseLeinecker}>
      <Modal.Content size="80" height="410">
        <Image style={{ height: "100%", width: "100%" }} source={require('./assets/leinecker.jpg')} />
        </Modal.Content>
      </Modal>
      </Center>
    </View>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: "23%",
    marginTop: "4%",
    marginBottom: "2%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },

  logoImg1: {
    height: "90%",
    width: "9%",
    borderRadius: 25,
    marginLeft: "5%",
    borderWidth: 1
  },

  logoImg2: {
    height: "90%",
    width: "9%",
    borderRadius: 25,
    marginRight: "5%"
  },
  modalContent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%'
  },
});
