// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [safeScore, setSafeScore] = useState(null);

  const getSafeRoute = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "Location access is required.");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);

    try {
      let response = await fetch("http://localhost:5000/safe-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: loc.coords.latitude, longitude: loc.coords.longitude })
      });
      let data = await response.json();
      setSafeScore(data.safeScore);
      Alert.alert("Safe Route", `Score: ${data.safeScore}/100\n${data.message}`);
    } catch (error) {
      Alert.alert("Error", "Could not connect to backend.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HerShield AI+</Text>
      <Button title="Get Safe Route" onPress={getSafeRoute} />
      {location && <Text>📍 Location: {location.coords.latitude}, {location.coords.longitude}</Text>}
      {safeScore && <Text>🛡️ Safety Score: {safeScore}/100</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});
