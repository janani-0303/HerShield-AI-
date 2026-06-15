import React from 'react';
import { View, Button, Alert } from 'react-native';

export default function YellowButtonScreen() {
  const handleCheckIn = () => {
    fetch('http://localhost:5000/check-in', { method:'POST' });
    Alert.alert("Check-in sent to guardians!");
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Button title="Yellow Button" color="orange" onPress={handleCheckIn} />
    </View>
  );
}
