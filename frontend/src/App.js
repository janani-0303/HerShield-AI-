import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SafeRouteScreen from './screens/SafeRouteScreen';
import SOSScreen from './screens/SOSScreen';
import YellowButtonScreen from './screens/YellowButtonScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SafeRoute" component={SafeRouteScreen} />
        <Stack.Screen name="YellowButton" component={YellowButtonScreen} />
        <Stack.Screen name="SOS" component={SOSScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

useEffect(() => {
  messaging().requestPermission();
  messaging().getToken().then(token => {
    console.log("FCM Token:", token);
    // Send token to backend for guardian notifications
  });

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    alert(`Notification: ${remoteMessage.notification.body}`);
  });

  return unsubscribe;
}, []);
