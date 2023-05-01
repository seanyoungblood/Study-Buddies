import React from 'react';
import { TextInput } from 'react-native';

const LastNameInput = (props) => {
    return (
      <TextInput
        placeholder="Enter your last name"
        onChangeText={props.onChangeText}
        value={props.value}
        style={props.style}
      />
    );
  };
  
  export default LastNameInput;