
import {AuthContextProvider} from './LoginContext';
import { StyleSheet, Image, View, Text, StatusBar } from 'react-native';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import headerBar from './headerBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import { TouchableOpacity } from 'react-native'
import { NativeBaseProvider, Box, HStack, Center, Icon } from "native-base";
import HeaderLogo from "./HeaderLogo";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchPage from "./SearchPage";
import SchoolPage from './SchoolPage';
import MajorPage from "./MajorPage";
import ProfilePage from "./ProfilePage";
import {useRef} from 'react';
import BaristaGPTPage from './BaristaGPTPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




function Home({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Study"
      screenOptions={{
        backgroundColor: 'white',
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: 'white',
        headerShadowVisible: false,
        headerTitleStyle: {
        },
        headerShown: false,
        animation: 'none',

      }}>
      <Tab.Screen name="School" component={SchoolPage} options={{
        tabBarIcon: ({ size, focused, color }) => {
          return (
            <Image
              style={{ width: size, height: size }}
              source={require('./assets/horse.png')}
            />
          );
        },
      }} />
      <Tab.Screen name="Study" component={SearchPage}
        options={{

          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                style={{ width: size, height: size }}
                source={require('./assets/group.png')}
              />
            );
          },
        }} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{
        tabBarIcon: ({ size, focused, color }) => {
          return (
            <Image
              style={{ width: size, height: size }}
              source={require('./assets/profile.png')}
            />
          );
        },
      }} />

    </Tab.Navigator>
  );
}

export default function App() {
  

  return (
    <NavigationContainer>
      <AuthContextProvider>
          <NativeBaseProvider>
            <Stack.Navigator
              initialRouteName={"LoginPage"}
              screenOptions={{
                tabBarStyle: {
                  display: "none",
                },
                headerShown: false,
                animation: 'none',
                tabBarButton: () => null,
                gestureEnabled: false
              }}>
                <Tab.Screen
            name="BaristaGPT"
            component={BaristaGPTPage}
            options={() => ({
              tabBarStyle: {
                display: "none",
              },
              animation: 'none',
              headerShown: false,
              tabBarButton: () => null,
              
            })}

          />
          <Tab.Screen
            name="LoginPage"
            component={LoginPage}
            options={() => ({
              tabBarStyle: {
                display: "none",
              },
              animation: 'none',
              headerShown: false,
              tabBarButton: () => null,
            })}

          />
          <Tab.Screen
            name="RegisterPage"
            component={RegisterPage}
            options={() => ({
              tabBarStyle: {
                display: "none",
              },
              headerShown: false,
              animation: 'none',
              tabBarButton: () => null,
            })}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarStyle: {
                display: "none",
              },
              headerShown: false,
              animation: 'none',
              tabBarButton: () => null,
            }}
            
          />
        </Stack.Navigator>
        </NativeBaseProvider>
        </AuthContextProvider>
      </NavigationContainer>
    
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});


