import ApiRoutesEnum from '../shared/ApiRoutesEnum';
import { Coordinates } from '../types/Coordinates';
import { ServiceAddress } from '../types/ServiceAddress';
import { ServiceEstimate } from '../types/ServiceEstimate';
import { ServiceId } from '../types/ServiceId';
import ApiService from './ApiService';

class HeroService {
  static async requestService(
    from: ServiceAddress,
    to: ServiceAddress[],
    customerLocation: Coordinates,
    tier: string,
    paymentMethod: string,
    estimated: ServiceEstimate,
  ): Promise<ServiceId> {
    const { id: serviceId } = await ApiService.post<{ id: string }>({
      url: ApiRoutesEnum.REQUEST_SERVICE,
      body: {
        from,
        to,
        customerLocations: [customerLocation],
        tier,
        paymentMethod,
        estimated,
      },
    });

    console.log('body', { from, to, customerLocations: [customerLocation] });

    return serviceId;
  }

  static async cancelService(serviceId: string): Promise<void> {
    await ApiService.put({
      url: ApiRoutesEnum.CANCEL_SERVICE.replace(':id', serviceId),
    });
  }

  private static updateCustomerPosition() {}

  private static getUpdatedAgentPosition() {}
}
export default HeroService;
