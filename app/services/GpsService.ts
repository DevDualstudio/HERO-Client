import Geolocation from '@react-native-community/geolocation';
import { Coordinates } from '../types/Coordinates';

class GpsService {
  static getCurrentLocation = () => {
    return new Promise<Coordinates>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error', JSON.stringify(error));
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    });
  };
}
export default GpsService;
