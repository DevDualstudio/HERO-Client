import { useContext } from 'react';
import { ActiveServiceContext } from '../shared/ActiveServiceContext';
import { Service } from '../types/Service';

const useActiveService = () => {
  const {
    activeService,
    setActiveService: setActiveServiceInContext,
  } = useContext(ActiveServiceContext);

  const setActiveService = (service: Service) => {
    setActiveServiceInContext(service);
  };

  return { activeService, setActiveService };
};
export default useActiveService;
