import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

export default function SafeRouteScreen() {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/safe-route')
      .then(res => res.json())
      .then(data => setRoute(data.points));
  }, []);

  return (
    <View style={{ flex:1 }}>
      <MapView style={{ flex:1 }}>
        {route.length > 0 && (
          <Polyline coordinates={route} strokeColor="green" strokeWidth={4} />
        )}
      </MapView>
    </View>
  );
}
