import React from 'react';
import { Service } from '../types/Service';

type ActiveContextType = {
  activeService: Service | null;
  setActiveService: (service: Service) => void;
};

export const ActiveServiceContext = React.createContext<ActiveContextType>({
  activeService: null,
  setActiveService: () => {},
});
