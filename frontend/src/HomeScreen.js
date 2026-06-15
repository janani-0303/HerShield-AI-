import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:24 }}>HerShield AI+</Text>
      <Button title="Safe Route" onPress={() => navigation.navigate('SafeRoute')} />
      <Button title="Yellow Button" onPress={() => navigation.navigate('YellowButton')} />
      <Button title="SOS" onPress={() => navigation.navigate('SOS')} />
    </View>
  );
}
