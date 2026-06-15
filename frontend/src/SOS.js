import React from 'react';
import { View, Button, Alert } from 'react-native';

export default function SOSScreen() {
  const handleSOS = () => {
    fetch('http://localhost:5000/sos', { method:'POST' });
    Alert.alert("SOS triggered! Help is on the way.");
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Button title="Trigger SOS" color="red" onPress={handleSOS} />
    </View>
  );
}
