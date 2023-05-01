import React from 'react';
import { TextInput } from 'react-native';

const PasswordInput = (props) => {
    return (
      <TextInput
        placeholder="Enter your password"
        onChangeText={props.onChangeText}
        value={props.value}
        style={props.style}
      />
    );
  };
  
  export default PasswordInput;
  