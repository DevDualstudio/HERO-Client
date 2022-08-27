import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import { Image, StyleSheet, View } from 'react-native';
import { Screens } from '../styles';
import { useNavigation } from '@react-navigation/native';
import RoutesEnum from '../shared/RoutesEnum';
import Button from '../components/Button';
import LocationValidationResult from '../components/LocationValidationResult';
import { Coordinates } from '../types/Coordinates';
import DeviceInfo from 'react-native-device-info';
import mapStyle from '../config/mapStyle';
import ZoneService from '../services/ZoneService';
import { showMessage } from 'react-native-flash-message';
import LoadingIndicator from '../components/LoadingIndicator';

const ValidateLocation = (): JSX.Element => {
  const navigation = useNavigation();
  const [userCoordinates, setUserCoordinates] = useState<Coordinates>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isServiceAvailable, setIsServiceAvailable] = useState<Boolean>(false);

  const setCustomerLocation = (coords: Coordinates) => {
    setUserCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    checkServiceAvailability(coords.longitude, coords.latitude);
  };

  useEffect(() => {
    if (DeviceInfo.isEmulator()) {
      // Valid Range
      setCustomerLocation({
        latitude: 40.73579387927485,
        longitude: -73.99243546953032,
      });
      // Invalid Range
      // setCustomerLocation({ latitude: -34.5730319, longitude: -51.4672199 });
    } else {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
        .then((location) => {
          setCustomerLocation({
            latitude: location.latitude,
            longitude: location.longitude,
          });
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
          showMessage({
            message: 'Unable to get location',
            description: 'Please allow hero to access your location',
            type: 'danger',
            duration: 2000,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkServiceAvailability = async (
    longitude: number,
    latitude: number,
  ) => {
    try {
      const isInRange = await ZoneService.inRange(longitude, latitude);
      if (isInRange) {
        setIsServiceAvailable(true);
      } else {
        showMessage({
          message: 'Zone Availability',
          description: 'The service is not available in your area',
          type: 'warning',
          duration: 2000,
        });
      }
      setIsServiceAvailable(isInRange);
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Error',
        description: 'An error has ocurred, please try again later',
        type: 'danger',
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={styles.screen}>
      <View>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={mapCenter}
            customMapStyle={mapStyle}>
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
      </View>

      <View style={styles.bottomInfo}>
        <LocationValidationResult
          isAvailable={isServiceAvailable}
          style={styles.locationValidationCard}
        />
        <Button
          disabled={!isServiceAvailable}
          onPress={() => {
            navigation.navigate(RoutesEnum.SIGNUP_LOGIN);
          }}>
          Continue
        </Button>
      </View>
      {isLoading && <LoadingIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mapContainer: {
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerIcon: {
    width: 30,
    height: 30,
  },
  bottomInfo: {
    ...Screens.base,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    backgroundColor: 'transparent',
  },
  locationValidationCard: {
    marginBottom: 20,
  },
});
export default ValidateLocation;
