import React, { useState } from 'react';
import { TextInput } from 'react-native';
import {Input} from 'native-base';

const CoursePrefixInput = () => {
  const [text, setText] = useState('');

  const handleTextChange = (inputText) => {
    // Force caps
    const capsText = inputText.toUpperCase();

    // Limit to 3 characters
    const limitedText = capsText.slice(0, 3);

    setText(limitedText);
  };

  return (
    <Input
      value={text}
      onChangeText={handleTextChange}
      maxLength={3}
      placeholder="Course Prefix Ex. COP, COT"
    />
  );
};

export default CoursePrefixInput;
