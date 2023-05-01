import { StyleSheet, View, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import CustomText from './CustomFont';
import { Alert, Text, Center, VStack, HStack, IconButton, Box, CloseIcon, Heading, Collapse, Button, KeyboardAvoidingView } from "native-base";


function InvalidFieldAlert(props) {

    // const [show, setShow] = React.useState(false);

    return (<Box w="100%" alignItems="center">
      <Collapse isOpen={props.show} alignItems="center">
        <Alert maxW="95%" minW="95%" status="error" marginBottom={5}>
          <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text fontSize="md" fontWeight="medium" _dark={{
                  color: "coolGray.800"
                }}>
                  Invalid Info
                </Text>
              </HStack>
              <IconButton variant="unstyled" _focus={{
                borderWidth: 0
              }} icon={<CloseIcon size="3" />} _icon={{
                color: "coolGray.600"
              }} onPress={() => props.setShow(false)} />
            </HStack>
            <Box pl="6" _dark={{
              _text: {
                color: "coolGray.600"
              }
            }}>
              {props.errorMessage}
            </Box>
          </VStack>
        </Alert>
      </Collapse>
    </Box>);
  }


  export default InvalidFieldAlert;