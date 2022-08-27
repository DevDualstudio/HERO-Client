import { ServiceAddress } from './ServiceAddress';

export type Service = {
  id: string;
  from: ServiceAddress;
  to: ServiceAddress[];
};
