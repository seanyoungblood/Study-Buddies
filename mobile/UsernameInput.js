import React from 'react';
import { TextInput } from 'react-native';

const UsernameInput = (props) => {
    return (
      <TextInput
        placeholder="Enter your username"
        onChangeText={props.onChangeText}
        value={props.value}
        style={props.style}
      />
    );
  };
  
  export default UsernameInput;
  