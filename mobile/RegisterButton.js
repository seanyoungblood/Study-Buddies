import React from 'react';
import { Button } from 'react-native';

const RegisterButton = (props) => {
  return (
    <Button
     onPress={() =>navigation.navigate('Profile', {name: 'Jane'})}
     title="Register"
     color="#000000"
    accessibilityLabel="Press to Register"
    />
  );
};

export default RegisterButton;