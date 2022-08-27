import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import mapStyle from '../config/mapStyle';
import { Coordinates } from '../types/Coordinates';
import Geolocation from '@react-native-community/geolocation';

const HeroServiceMap = () => {
  const [userCoordinates, setUserCoordinates] = useState<Coordinates>();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setUserCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.error('Error', JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  const defaultRegion: Coordinates = {
    latitude: 40.7078144,
    longitude: -73.9506771,
  };

  let mapCenter = {
    latitude: userCoordinates
      ? userCoordinates.latitude
      : defaultRegion.latitude,
    longitude: userCoordinates
      ? userCoordinates.longitude
      : defaultRegion.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapCenter} customMapStyle={mapStyle}>
        {userCoordinates && (
          <Marker coordinate={mapCenter}>
            <Image
              source={require('../assets/icon-current-position.png')}
              style={styles.markerIcon}
              resizeMode="contain"
            />
          </Marker>
        )}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 220,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerIcon: {
    width: 30,
    height: 30,
  },
});
export default HeroServiceMap;
