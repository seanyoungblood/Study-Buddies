import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DeleteAccountModal from './DeleteAccountModal';
import { Container } from 'native-base';
import { AuthContext } from './LoginContext';
import { useContext } from 'react';
import EditAccountModal from './EditAccountModal';
import AddClassesModal from './AddClassesModal';
import MemberGroupModal from './MemberGroupModal';
import AdminGroupModal from './AdminGroupModal';


const GroupList = ({ groups, deleteAccount, editAccount, navigation, isClasses, accountInfo, memberOf, leaderOf, addClasses, setItemTitle, setShowMemberGroupModal, setShowAdminGroupModal }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const findClass = async (text) => {
    try {
      console.log("Searching for " + text);
      const response = await fetch('https://cop-study-buddy-1000.herokuapp.com/api/searchGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field:'groupName', search: text }),
      });
      var data2 = JSON.parse(await response.text());
      setItemTitle(data2.results[0]);
      console.log("Results: " + data2.results[0].groupName);
      console.log("admin: " + data2.results[0].admin + " current user: " + currentUser._id);
      if(data2.results[0].admin == currentUser._id){
        console.log("Opening modal for user as admin");
        setShowAdminGroupModal(true);
      }
      else{
        console.log("Opening modal for user as member");
        setShowMemberGroupModal(true);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const accountInfoPress = (id) =>{
    console.log(id);
    if(id == '0'){ //add classes
      addClasses();
    }
    else if(id == '4'){ //logout
      navigation.navigate('LoginPage');
    }
    else if(id == '5'){ //delete account
      deleteAccount();
    }
    else{ //edit details
      editAccount();
    }
  }

  const displaytest = () =>{
    console.log(groups);
  }
  
  return (
    <FlatList
      data={groups}
      renderItem={({ item }) => (
        <View>
          {accountInfo && <TouchableOpacity onPress={() => accountInfoPress(item.id)}>
          <View style={styles.item2}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          </TouchableOpacity>}
          {memberOf && <TouchableOpacity style={styles.item} onPress={() => findClass(item.title)}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          </TouchableOpacity>
        }
          {isClasses && <TouchableOpacity style={styles.item} onPress={displaytest}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          </TouchableOpacity>
          }
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};


const ProfileTabBar = ({ tabs, navigation, setFirst, setLast, currentUser, setCurrentUser }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddClassesModal, setShowAddClassesModal] = useState(false);
  const [showAdminGroupModal, setShowAdminGroupModal] = useState(false);
  const [showMemberGroupModal, setShowMemberGroupModal] = useState(false);
  const [itemtitle, setItemTitle] = useState([]);

  const handleDeleteAccountPress = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
  };

  const handleEditAccountPress = () => {
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleAddClassesPress = () => {
    setShowAddClassesModal(true);
  };

  const handleAddClassesClose = () => {
    setShowAddClassesModal(false);
  };

  const handleAdminGroupModalPress = () => {
    setShowAdminGroupModal(true);
  };

  const handleAdminGroupModalClose = () => {
    setShowAdminGroupModal(false);
  };

  const handleMemberGroupModalPress = () => {
    setShowMemberGroupModal(true);
  };

  const handleMemberGroupModalClose = () => {
    setShowMemberGroupModal(false);
  };
  

  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index) => {
    setActiveTab(index);
  };

  return (
    <View style={styles.tabContainer}>
      
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => (
          <Text
            key={index}
            onPress={() => handleTabPress(index)}
            style={[
              styles.tab,
              activeTab === index ? styles.activeTab : null,
            ]}
          >
            {tab.label}
          </Text>
        ))}
      </View>
      <View style={styles.tabContent}>
        {tabs.map((tab, index) => (
          <View
            key={index}
            style={[
              styles.tabPane,
              activeTab === index ? styles.activeTabPane : null,
            ]}
          >
            
          <GroupList navigation={navigation} setShowAdminGroupModal={setShowAdminGroupModal} setShowMemberGroupModal={setShowMemberGroupModal} setItemTitle={setItemTitle} groups={tab.groups} memberOf={index == 0} accountInfo={index == 2} isClasses={index == 1} deleteAccount={handleDeleteAccountPress} editAccount={handleEditAccountPress} addClasses={handleAddClassesPress}/>
          </View>
        ))}
      </View>
      <Container>
      <DeleteAccountModal isOpen={showDeleteModal} onClose={handleDeleteModalClose} navigation={navigation} />
      </Container>
      <Container>
      <EditAccountModal isOpen={showEditModal} onClose={handleEditModalClose} tabs={tabs} setFirst={setFirst} setLast={setLast} />
      </Container>
      <Container>
      <AddClassesModal isOpen={showAddClassesModal} onClose={handleAddClassesClose} tabs={tabs} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </Container>
      <Container>
      <MemberGroupModal group={itemtitle} isOpen={showMemberGroupModal} onClose={handleMemberGroupModalClose} tabs={tabs} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </Container>
      <Container>
      <AdminGroupModal group={itemtitle} isOpen={showAdminGroupModal} onClose={handleAdminGroupModalClose} tabs={tabs} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </Container>
    </View>
  );
};


export default ProfileTabBar;

const styles = StyleSheet.create({
    tabContainer: {
      flex: 1,
      flexDirection: 'column',
      marginTop: '1%',
      width:'100%',
      height:'100%'
    },
    image: {
        width: 64,
        height: 64,
        marginRight: 16,
      },
    tabBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width:"100%"
    },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      fontSize: 14,
      fontWeight: 'bold',
      color: '#888',
    },
    activeTab: {
      color: '#000',
      borderBottomWidth: 2,
      borderBottomColor: '#000',
    },
    tabContent: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
    tabPane: {
      flex: 1,
      padding: 0,
      display: 'none',
    },
    activeTabPane: {
      display: 'flex',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      width:'100%'
    },
    item2: {
      padding: 10,
      fontSize: 18,
      height: 88,
      width:'100%'
    },
    textContainer: {
        width:'100%'
      },
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
      item2: {
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
  });
  

