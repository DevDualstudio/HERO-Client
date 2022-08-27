import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import HeroServiceMap from '../../components/HeroServiceMap';
import NavigationHeader from '../../components/NavigationHeader';
import ServicePathAddresses from '../../components/ServicePathAddresses';
import TierSelector from '../../components/TierSelector';
import HeroService from '../../services/HeroService';
import RoutesEnum, { RootStackParamList } from '../../shared/RoutesEnum';
import { TiersEnum } from '../../shared/TiersEnum';
import moment from 'moment';
import PaymentSelector from '../../components/PaymentSelector';
import { PaymentMethod } from '../../types/PaymentMethod';
import { navigateAndResetStack } from '../../shared/utils';
import useActiveService from '../../hooks/useActiveService';
import GoogleMapsService from '../../services/GoogleMapsService';
import { get } from 'lodash';

type ScreenRouteProp = RouteProp<
  RootStackParamList,
  RoutesEnum.REQUEST_NOW_TIER_SELECTION
>;

const RequestNowTierSelection = () => {
  const { setActiveService } = useActiveService();
  const navigation = useNavigation();
  const route: ScreenRouteProp = useRoute();
  const { from, to, customerLocation } = route.params;

  const [selectedTier, setSelectedTier] = useState(TiersEnum.HERO);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>();

  const [gmapsEstimates, setGmapsEstimates] = useState();
  const distanceInMeters: number | undefined = get(
    gmapsEstimates,
    'rows[0].elements[0].distance.value',
  );
  const durationInSeconds: number | undefined = get(
    gmapsEstimates,
    'rows[0].elements[0].duration.value',
  );

  const requestService = async () => {
    try {
      if (!distanceInMeters || !durationInSeconds) {
        Alert.alert(
          'Error',
          "Couldn't find a route between the origin and destination",
        );
        return;
      }

      const serviceId = await HeroService.requestService(
        from,
        to,
        customerLocation,
        selectedTier,
        selectedPayment!.id,
        {
          distance: distanceInMeters,
          duration: durationInSeconds,
          agentCommission: 500,
          amount: 1000,
        },
      );
      setActiveService({
        from,
        to,
        id: serviceId,
      });
      navigateAndResetStack(navigation, RoutesEnum.REQUEST_NOW_SEARCHING_AGENT);
    } catch (e) {
      Alert.alert('Error', 'asdasd');
      console.log(e);
    }
  };

  const fakeTierOptionsResponse = [
    {
      tierCode: TiersEnum.HERO,
      timeOfArrival: moment().add(15, 'minutes').toDate(),
      price: 20,
    },
    {
      tierCode: TiersEnum.SPECIALIST,
      timeOfArrival: moment().add(12, 'minutes').toDate(),
      price: 40,
    },
    {
      tierCode: TiersEnum.SUPER_HERO,
      timeOfArrival: moment().add(9, 'minutes').toDate(),
      price: 70,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await GoogleMapsService.getDistanceAndTime(from, to);
      setGmapsEstimates(result);
    };
    fetchData();
  }, []);

  return (
    <View>
      <NavigationHeader />
      <HeroServiceMap />
      <View style={styles.pathContainer}>
        <ServicePathAddresses from={from} to={to} />
        <Text>Distance in meters: {distanceInMeters}</Text>
        <Text>Duration in seconds: {durationInSeconds}</Text>
      </View>
      <View style={styles.tierSelectorContainer}>
        <TierSelector
          tierOptions={fakeTierOptionsResponse}
          selectedTier={selectedTier}
          onSelectTier={(newTier) => setSelectedTier(newTier)}
        />
        <PaymentSelector
          selectedPayment={selectedPayment}
          onSelectPayment={(newPayment) => setSelectedPayment(newPayment)}
        />
      </View>
      <Button
        disabled={!selectedTier || !selectedPayment}
        onPress={requestService}>
        Schedule Hero
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  pathContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 30,
    marginTop: -15,
    alignItems: 'flex-start',
  },
  tierSelectorContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 30,
    marginTop: -15,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
});

export default RequestNowTierSelection;
