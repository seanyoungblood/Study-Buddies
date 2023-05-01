import React from 'react';
import { TextInput } from 'react-native';

const FirstNameInput = (props) => {
    return (
      <TextInput
        placeholder="Enter your first name"
        onChangeText={props.onChangeText}
        value={props.value}
        style={props.style}
      />
    );
  };
  
  export default FirstNameInput;