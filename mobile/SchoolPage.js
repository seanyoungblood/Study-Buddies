
import { StyleSheet, Text, View, Image, Alert, Button, TouchableOpacity, Linking } from 'react-native';
import HeaderLogo from './HeaderLogo';


const SchoolPage = ({ navigation, route }) => {
  const handleUCF = () => {
    Linking.openURL('https://www.ucf.edu');
  };

  const handleHitt = () => {
    Linking.openURL('https://library.ucf.edu/services/study-rooms/#tab_Hitt');
  };

  const handleRosen = () => {
    Linking.openURL('https://library.ucf.edu/services/study-rooms/#tab_Rosen');
  };

  const handleCal = () => {
    Linking.openURL('https://events.ucf.edu/');
  };

  const handleTutor = () => {
    Linking.openURL('https://www.ucf.edu/online/student-resources/tutoring/');
  };


  return (
    <View style={styles.container}>
      <HeaderLogo></HeaderLogo>
      <TouchableOpacity style={styles.UCFimg} onPress={handleUCF}>
        <Image style={{ height: '100%', width: '100%' }} source={require('./assets/ucf.png')} />
      </TouchableOpacity>

      <View style={{ width: '90%', height: '55%' }}>
        <Text style={styles.text1}>Reserve a Room:</Text>
        <View style={{ flex: 1, flexDirection: 'row', width: '100%', height:'50%', justifyContent: 'space-between' }}>
          <TouchableOpacity style={styles.image} onPress={handleHitt}>
          <Image style={styles.image2} source={require('./assets/HittLib.png')} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.image} onPress={handleRosen}>
            <Image style={styles.image2} source={require('./assets/RosenLib.png')} />
          </TouchableOpacity>
          
        </View>
        <Text style={styles.text2}>Resources:</Text>
        <View style={{ flex: 1, flexDirection: 'row', width: '100%', height:'50%', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.image} onPress={handleCal}>
        <Image style={styles.image2} source={require('./assets/UCFCalendar.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.image} onPress={handleTutor}>
        <Image style={styles.image2} source={require('./assets/tutor.png')} />
        </TouchableOpacity>
        
      </View>
      </View>
  </View>
  );
};

export default SchoolPage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
  },
  subcontainer: {
    borderRadius: 15,
    overflow: 'hidden',
    height: '10'
  },
  UCFimg: {
    width: '90%',
    height: '24%',
    marginTop: '5%',
    alignContent: 'center',
    justifyContent: 'center',

  },
  image: {
    width: '48%',
    height: '110%',
    borderRadius:15,
    borderWidth:1,

  },
  image2: {
    width: '100%',
    height: '100%',
    borderRadius:15,

  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text1: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 3,
    marginTop:'2%',
    marginBottom:'1%'
  },
  text2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 3,
    marginTop:'8%',
    marginBottom:'1%'
  },

  logo: {
    width: '100%',
    height: '30%',
    alignItems: 'center'
  },

  logoimg: {
    width: '100%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  usernameInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
    width: '100%',
  },

  passwordInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    padding: 10,
    width: '100%',
    marginTop: '3%',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginBottom: '30%',
    marginTop: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  button: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});