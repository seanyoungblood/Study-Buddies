
import { StyleSheet, Text, View, Image, Alert, Button } from 'react-native';
import HeaderLogo from './HeaderLogo';
import ProfileTabBar from './ProfileTabBar';
import { AuthContext } from './LoginContext';
import { useContext, useState, useEffect } from 'react';
import AddClassesModal from './AddClassesModal';


const ProfilePage = ({navigation, route}) => {
  const {currentUser, setCurrentUser} = useContext(AuthContext);
  const [first, setFirst] = useState(currentUser.firstName);
  const [last, setLast] = useState(currentUser.lastName);

  const doLogout = () => navigation.navigate('LoginPage');

  

  const tabs = [
    {
      label: 'Member of',
      groups: [
        {
          id: '1',
          title: 'Item 1',
          description: 'Description for Item 1',
          image: require('./assets/leinecker.jpg'),
        },
        {
          id: '2',
          title: 'Item 2',
          description: 'Description for Item 2',
          image: require('./assets/leinecker.jpg'),
        },
        {
          id: '3',
          title: 'Item 3',
          description: 'Description for Item 3',
          image: require('./assets/leinecker.jpg'),
        },
      ]
    },
    {
      label: 'Classes',
      groups: [
        {
        
        }
      ]
    },
    {
      label: 'Account Info',
      groups: [
        {
          id: '0',
          title: 'Add Classes',
          description: 'Here you add classes you are enrolled in',
        },
        {
          id: '1',
          title: 'Set First Name',
          description: currentUser.firstName,
        },
        {
          id: '2',
          title: 'Set Last Name',
          description: currentUser.lastName,
        },
        {
          id: '3',
          title: 'Set Phone Number',
          description: currentUser.phone,
        },
        {
          id: '4',
          title: 'Logout',
          description: 'Didn\'t want you here anyways',
        },
        {
          id: '5',
          title: 'Delete Account',
          description: 'Might cause you to fail, but hey it\'s your funeral',
        },
      ]
    },
  ];

  const [updatedTabs, setUpdatedTabs] = useState(tabs);

  useEffect(() => {
    const getClassObjects = (classList) => {
      return classList.map((className, index) => {
        return {
          id: index,
          title: className,
          description: `Details for ${className}`,
        };
      });
    };

    const getGroupObjects = () => {
      return currentUser.groupsIn.map((groupName, index) => {
        return {
          id: index,
          title: groupName,
          description: `Details for ${groupName}`,
        };
      });
    };

    const newTabs = tabs.map((tab) => {
      if (tab.label === "Classes") {
        console.log("classes");
        const classesTaking = getClassObjects(currentUser.classesTaking);
        return {
          ...tab,
          groups: classesTaking,
        };
      }
      else if(tab.label === "Member of"){
        console.log("member");
        const groupsIn = getGroupObjects();
        return {
          ...tab,
          groups: groupsIn,
        };
      }
      else {
        return tab;
      }
    });

    setUpdatedTabs(newTabs);
  }, [currentUser, currentUser.classesTaking, currentUser.groupsIn]);

    return (
      <View style={styles.container}>
      <HeaderLogo></HeaderLogo>
      <View style={styles.profileContainer}>
        <Image
          source={require('./assets/leinecker.jpg')}
          style={styles.profileImage}
        />
      </View>
      <Image
        source={require('./assets/ucf.png')}
        style={styles.banner}
      />
      <View style={styles.overlay} />
      <View style={{textAlign:'left'}}>
      <Text style={styles.name}>{first} {last}</Text>
      <Text style={styles.bio}>Computer Science B.S.</Text>
      </View>
      
      <ProfileTabBar tabs={updatedTabs} navigation={navigation} setFirst={setFirst} setLast={setLast} currentUser={currentUser} setCurrentUser={setCurrentUser}></ProfileTabBar>
      
    </View>
    );
  };
  
  export default ProfilePage;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      height:"150%",
      backgroundColor: 'white',
    },
    profileContainer: {
      position: 'absolute',
      top: "24%",
      zIndex:2,
      left: "6%",
      height:"100%",
      
    },
    banner: {
      width: '100%',
      height: "20%",
      borderWidth: 1,
      borderColor: '#ccc',
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '10%',
      backgroundColor: 'white',
    },
    profileImage: {
      width: "4500%",
      height: "15%",
      borderRadius: 60,
      borderWidth: 1,
      borderColor: '#000',
    },
    name: {
      fontSize: 30,
      fontWeight: 'bold',
      left:40,
      textAlign:"left"
    },
    bio: {
      fontSize: 14,
      left:40,
      textAlign: 'left',
      marginHorizontal: 0,
    },
  });