import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Spinner } from '@ui-kitten/components';
import { Text, View } from 'react-native';
import ServicePathAddresses from '../../components/ServicePathAddresses';
import RoutesEnum from '../../shared/RoutesEnum';
import useActiveService from '../../hooks/useActiveService';
import HeroServiceMap from '../../components/HeroServiceMap';
import Button from '../../components/Button';
import HeroService from '../../services/HeroService';
import { navigateAndResetStack } from '../../shared/utils';
const RequestNowSearchingAgent = ({}) => {
  const navigation = useNavigation();
  const { activeService } = useActiveService();

  useEffect(() => {
    setTimeout(() => {
      // setActiveService({...activeService, })
    }, 15000);
  });

  if (!activeService) {
    navigation.navigate(RoutesEnum.MAIN);
    return <Spinner />;
  }

  const cancelRequest = () => {
    HeroService.cancelService(activeService.id);
    navigateAndResetStack(navigation, RoutesEnum.MAIN);
  };

  return (
    <View>
      {/* <NavigationHeader onBack={cancelRequest} /> */}
      <HeroServiceMap />
      <Text>Searching Service....</Text>
      <View>
        <ServicePathAddresses from={activeService.from} to={activeService.to} />
      </View>
      <Text>ServiceId: {activeService.id}</Text>
      <Button onPress={cancelRequest}>Cancel request</Button>
    </View>
  );
};
export default RequestNowSearchingAgent;
