import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Searchbar = ({ onResults, text, setText }) => {
  

  const handleTextChange = (value) => {
    setText(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Searching for " + text);
        const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/searchGroup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ field:'groupName', search: text }),
        });
        var data = JSON.parse(await response.text());
        console.log("Results: " + data.results);
        onResults(data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [text, setText]);

  /*
    Search returns weird long array of strings
    Needs to be parsed correct and integrated with swipableflatlist
  */

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="gray"
        onChangeText={handleTextChange}
        value={text}
      />
    </View>
  );
};

export default Searchbar;



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    height:"6%",
    borderColor:"#d3d3d3",
    borderWidth:"1"
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
