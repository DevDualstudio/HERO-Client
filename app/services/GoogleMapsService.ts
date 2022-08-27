import { GOOGLE_MAPS_API_KEY } from '@env';
import { random } from 'lodash';
import queryString from 'query-string';
import { ServiceAddress } from '../types/ServiceAddress';

const sessionToken = random(100000);

interface autoCompleteResponse {
  description: string;
  place_id: string;
}

export interface autoCompleteResult {
  description: string;
  placeId: string;
}

class GoogleMapsService {
  static async autoCompleteResults(
    searchStr: string,
  ): Promise<autoCompleteResponse[]> {
    try {
      const params = {
        input: searchStr,
        key: GOOGLE_MAPS_API_KEY,
        sessionToken,
        language: 'en',
        components: 'country:us',
      };

      const paramsUrl = queryString.stringify(params);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?${paramsUrl}`,
      );

      if (response.ok && response.status === 200) {
        const results = await response.json();
        return results.predictions;
      } else {
        console.log(response);
        return [];
      }
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  static async getAddressFromPlaceId(
    placeId: string,
  ): Promise<ServiceAddress | null> {
    try {
      const params = {
        key: GOOGLE_MAPS_API_KEY,
        place_id: placeId,
      };

      const paramsUrl = queryString.stringify(params);

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${paramsUrl}`,
      );

      if (response.ok && response.status === 200) {
        const { results } = await response.json();

        return {
          latitude: results[0].geometry.location.lat,
          longitude: results[0].geometry.location.lng,
          address: results[0].formatted_address,
        };
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  static getDistanceAndTime = async (
    from: ServiceAddress,
    to: ServiceAddress[],
  ) => {
    const params = {
      key: GOOGLE_MAPS_API_KEY,
      language: 'en',
      units: 'metric',
      mode: 'walking',
      origins: `${from.latitude},${from.longitude}`,
      destinations: to
        .map((dest) => `${dest.latitude},${dest.longitude}`)
        .join('|'),
    };

    const paramsUrl = queryString.stringify(params);
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${paramsUrl}`;
    const result = await fetch(url);
    return result.json();
  };
}
export default GoogleMapsService;
