import ApiRoutesEnum from '../shared/ApiRoutesEnum';
import ApiService from './ApiService';

class ZoneService {
  static async inRange(longitude: number, latitude: number): Promise<Boolean> {
    const response: { inRange: boolean } = await ApiService.get({
      url:
        ApiRoutesEnum.ZONE_RANGE +
        `/longitude/${longitude}/latitude/${latitude}`,
    });
    return response.inRange;
  }
}
export default ZoneService;
