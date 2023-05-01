import { StyleSheet, Text, View, Image, Alert, Button, TextInput } from 'react-native';
import React, {useState} from 'react';

function headerBar() {
    return (
      <Image
        style={{ width: 50, height: 50 }}
        source={require('./assets/logo.png')}
      />
    );
  }

  export default headerBar;