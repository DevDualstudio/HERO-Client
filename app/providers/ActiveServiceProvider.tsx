import React, { useCallback, useState } from 'react';
import { ActiveServiceContext } from '../shared/ActiveServiceContext';
import { Service } from '../types/Service';

const ActiveServiceProvider: React.FC = ({ children }) => {
  const [activeService, setActiveServiceValue] = useState<Service | null>(null);
  const setActiveService = useCallback((service: Service) => {
    setActiveServiceValue(service);
  }, []);

  return (
    <ActiveServiceContext.Provider value={{ activeService, setActiveService }}>
      {children}
    </ActiveServiceContext.Provider>
  );
};
export default ActiveServiceProvider;
