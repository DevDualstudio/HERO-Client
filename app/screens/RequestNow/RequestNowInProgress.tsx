import React from 'react';
import { View } from 'react-native';
import HeroServiceMap from '../../components/HeroServiceMap';
import ServicePathAddresses from '../../components/ServicePathAddresses';
import useActiveService from '../../hooks/useActiveService';

const RequestNowInProgress = () => {
  const { activeService } = useActiveService();

  if (!activeService) {
    return;
  }

  return (
    <View>
      <HeroServiceMap />
      <View style={{}}>
        <ServicePathAddresses
          from={activeService?.from}
          to={activeService?.to}
        />
      </View>
    </View>
  );
};
export default RequestNowInProgress;
