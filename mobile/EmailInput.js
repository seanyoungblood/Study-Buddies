import React from 'react';
import { TextInput } from 'react-native';

const EmailInput = (props) => {
    return (
      <TextInput
        placeholder="Enter your knights email"
        onChangeText={props.onChangeText}
        value={props.value}
        style={props.style}
      />
    );
  };
  
  export default EmailInput;
  