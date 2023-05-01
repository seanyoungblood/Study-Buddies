import React, { useState } from 'react';
import { Modal, Button, Text, Input, KeyboardAvoidingView } from 'native-base';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';
import { TextInput } from 'react-native';


/*
    unfactor this code so you can have cool placeholders
*/


const CourseInput = ({ prefix, number, onChangePrefix, onChangeNumber }) => {
  const handlePrefixChange = (inputText) => {
    // Force caps
    const capsText = inputText.toUpperCase();

    // Limit to 3 characters
    const limitedText = capsText.slice(0, 3);

    onChangePrefix(limitedText);
  };

  return (
    <>
      <Text style={{ marginTop: '6%' }}>Course Prefix:</Text>
      <Input
        value={prefix}
        onChangeText={handlePrefixChange}
        maxLength={3}
        placeholder="Course Prefix Ex. COP, COT"
      />
      <Text style={{ marginTop: '6%' }}>Course Number:</Text>
      <Input
        value={number}
        onChangeText={onChangeNumber}
        keyboardType='numeric'
        w="100%"
        placeholder="Course Number"
        maxLength={4}
      />
    </>
  );
};

const AddClassesModal = ({ isOpen, onClose, tabs, currentUser, setCurrentUser }) => {

  const [courses, setCourses] = useState([
    { prefix: '', number: '' },
    { prefix: '', number: '' },
    { prefix: '', number: '' },
    { prefix: '', number: '' },
    { prefix: '', number: '' },
    { prefix: '', number: '' },
  ]);

  const handleCancelPress = () => {
    onClose();
  };

  const handlePrefixChange = (index, prefix) => {
    setCourses(prevCourses => {
      const newCourses = [...prevCourses];
      newCourses[index].prefix = prefix;
      return newCourses;
    });
  };

  const handleNumberChange = (index, number) => {
    setCourses(prevCourses => {
      const newCourses = [...prevCourses];
      newCourses[index].number = number;
      return newCourses;
    });
  };

  const app_name = 'cop-study-buddy-1000'

function buildPath(route)
{

        return 'https://' + app_name +  '.herokuapp.com/' + route;
    
}


    const [message,setMessage] = useState('');

    const doClasses = async event => 
    {

        var obj = {username:currentUser.username, class0:courses[0].prefix + courses[0].number, class1:courses[1].prefix + courses[1].number,class2:courses[2].prefix + courses[2].number,class3:courses[3].prefix + courses[3].number,class4:courses[4].prefix + courses[4].number,class5:courses[5].prefix + courses[5].number};
        
        if(obj.class0.length <= 3){
            obj.class0 = currentUser.classesTaking[0];
        }
        if(obj.class1.length <= 3){
            obj.class1 = currentUser.classesTaking[1];
        }
        if(obj.class2.length <= 3){
            obj.class2 = currentUser.classesTaking[2];
        }
        if(obj.class3.length <= 3){
            obj.class3 = currentUser.classesTaking[3];
        }
        if(obj.class4.length <= 3){
            obj.class4 = currentUser.classesTaking[4];
        }
        if(obj.class5.length <= 3){
            obj.class5 = currentUser.classesTaking[5];
        }
        var js = JSON.stringify(obj);
        console.log(obj);
        try
        {    
            const response = await fetch(buildPath('api/addClasses'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser.token}`}});
          
            var res = JSON.parse(await response.text());
            console.log(res)

            if(!res._id)
            {
                console.log('please try again.');
            }
            else
            {
                const updatedUser = { ...currentUser };
                
                updatedUser.classesTaking = [obj.class0, obj.class1, obj.class2, obj.class3, obj.class4, obj.class5];
                setCurrentUser(updatedUser);
                console.log(currentUser)
                console.log('Works');
            }
        }
        catch(e)
        {
            console.log(e);
            return;
        }    
    };


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <KeyboardAvoidingView>
        <Modal.Content size="80" height="410">
          <Modal.Header>Edit Courses Taking</Modal.Header>
          <Modal.Body>
            {courses.map((course, index) => (
              <CourseInput
                key={index}
                prefix={course.prefix}
                number={course.number}
                onChangePrefix={(prefix) => handlePrefixChange(index, prefix)}
                onChangeNumber={(number) => handleNumberChange(index, number)}
              />
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="ghost" space={2}>
              <Button onPress={handleCancelPress}>Cancel</Button>
              <Button onPress={doClasses}>Submit</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddClassesModal;
