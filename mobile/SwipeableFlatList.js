import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';



const SwipeableItem = ({ item, setData, data, index }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  

  const join = async () => {
    try {
      console.log("Attempting to join " + item.groupName);
      const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/joinGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`,
          // add any additional headers you need, such as authorization headers
        },
        body: JSON.stringify({ groupName: item.groupName }),
      });

      var res = JSON.parse(await response.text());
      // if the API call is successful, update the UI or state as needed
      console.log(res);
      //joinAction(item.id);
      const updatedUser = { ...currentUser };
                
      updatedUser.groupsIn.push(item.groupName);
      setCurrentUser(updatedUser);
      
      const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    } catch (error) {
      // handle errors if the fetch or API call fails
      console.log("Server error:" + error);
    }
  };
  

  const ignore = () => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    
  };

  const reviews = item.reviews || []; // Make sure reviews array exists

  const averageReview = reviews.length > 0 ? reviews.reduce((a, b) => a + b, 0) / reviews.length : 0;


  const renderRightActions = () => (
    <TouchableOpacity
      style={[styles.rightAction, { backgroundColor: '#388e3c' }]}
    >
      <Text style={styles.actionTextLeft}>Join</Text>
    </TouchableOpacity>
  );

  const renderLeftActions = () => (
    <TouchableOpacity
      style={[styles.leftAction, { backgroundColor: '#dd2c00' }]}
      onPress={ignore}
    >
      <Text style={styles.actionTextRight}>Ignore</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      onSwipeableRightOpen={join}
      onSwipeableLeftOpen={ignore}
      style={{backgroundColor:"white"}}
    >
      <View style={styles.item}>
        <View style={styles.textContainer}>
        <Text style={styles.title}>{item.groupName}</Text>
          <Text style={styles.description}>Course: {item.course}</Text>
          <Text style={styles.description}>Objective: {item.objective}</Text>
          <Text style={styles.description}>Date: {item.date}</Text>
          <Text style={styles.description}>Time: {item.time}</Text>
          <Text style={styles.description}>Location: {item.location}</Text>
          <Text style={styles.description}>Members: {item.members}</Text>
          <Text style={styles.description}>Average rating: {averageReview.toFixed(1)} ({reviews.length} reviews)</Text>

        </View>
      </View>
    </Swipeable>
  );
};

const SwipeableFlatList = ({ data, setData }) => {

  const renderItem = ({ item , index}) => (
    <SwipeableItem item={item} index={index} setData={setData} data={data} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 64,
    height: 64,
    marginRight: 16,
  },
  textContainer: {
    width:'100%'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  leftAction: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  actionTextLeft: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 300
  },
  actionTextRight: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 300
  },
});

export default SwipeableFlatList;

