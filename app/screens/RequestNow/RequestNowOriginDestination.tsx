import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import NavigationHeader from '../../components/NavigationHeader';
import { Screens } from '../../styles';
import Button from '../../components/Button';
import { ServiceAddress } from '../../types/ServiceAddress';
import GoogleMapsService, {
  autoCompleteResult,
} from '../../services/GoogleMapsService';
import BgCircleSvg from '../../components/svgs/BgCircleSvg';
import LocationSelectionInputs from '../../components/LocationSelectionInputs';
import BgDots2Svg from '../../components/svgs/BgDots2Svg';
import { useNavigation } from '@react-navigation/core';
import RoutesEnum from '../../shared/RoutesEnum';
import GpsService from '../../services/GpsService';
import PlacesHistory from '../../components/PlacesHistory';

const RequestNowOriginDestination = () => {
  const navigation = useNavigation();

  const [currentInputFocus, setCurrentInputFocus] = useState<
    'NONE' | 'ORIGIN' | 'DESTINATION'
  >('DESTINATION');

  const [origin, setOrigin] = useState<ServiceAddress>();
  const [destination, setDestionation] = useState<ServiceAddress>();

  const [originSuggestions, setOriginSuggestions] = useState<
    autoCompleteResult[]
  >([]);
  const [destinationSuggestions, setDestionationSuggestions] = useState<
    autoCompleteResult[]
  >([]);

  const onPressHistoryItem = (serviceAddress: ServiceAddress) => {
    if (currentInputFocus === 'ORIGIN') {
      setOrigin(serviceAddress);
    }
    if (currentInputFocus === 'DESTINATION') {
      setDestionation(serviceAddress);
    }
  };

  const showHistoryOptions =
    (currentInputFocus === 'ORIGIN' && !originSuggestions.length) ||
    (currentInputFocus === 'DESTINATION' && !destinationSuggestions.length);

  const setOriginToSuggestion = async (
    originSuggestion: autoCompleteResult,
  ) => {
    const serviceAddress = await GoogleMapsService.getAddressFromPlaceId(
      originSuggestion.placeId,
    );
    if (serviceAddress) {
      setOrigin({ ...serviceAddress, address: originSuggestion.description });
    }
  };

  const setDestinationToSuggestion = async (
    destinationSuggestion: autoCompleteResult,
  ) => {
    const serviceAddress = await GoogleMapsService.getAddressFromPlaceId(
      destinationSuggestion.placeId,
    );
    if (serviceAddress) {
      setDestionation({
        ...serviceAddress,
        address: destinationSuggestion.description,
      });
    }
  };

  const onNext = async () => {
    const customerLocation = await GpsService.getCurrentLocation();
    let from = origin || { ...customerLocation, address: 'Current location' };

    navigation.navigate(RoutesEnum.REQUEST_NOW_TIER_SELECTION, {
      from,
      to: [destination!],
      customerLocation,
    });
  };

  return (
    <View style={styles.screen}>
      <NavigationHeader noShadowToggle />
      <View style={styles.content}>
        <View style={styles.topContent}>
          <LocationSelectionInputs
            origin={origin}
            destination={destination}
            onOriginSuggestions={(suggestions) =>
              setOriginSuggestions(suggestions)
            }
            onDestionationSuggestions={(suggestions) =>
              setDestionationSuggestions(suggestions)
            }
            onFocusChange={(focus) => setCurrentInputFocus(focus)}
          />
        </View>
        <ScrollView style={styles.bottomContent}>
          {showHistoryOptions && (
            <View>
              <PlacesHistory />
            </View>
          )}
          {currentInputFocus === 'ORIGIN' && !showHistoryOptions && (
            <View>
              {originSuggestions.map((originSuggestion) => (
                <Pressable
                  onPress={() => setOriginToSuggestion(originSuggestion)}
                  key={originSuggestion.description}>
                  <View style={styles.suggestionItem}>
                    <Text>{originSuggestion.description}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
          {currentInputFocus === 'DESTINATION' && !showHistoryOptions && (
            <View>
              {destinationSuggestions.map((destionationSuggestion) => (
                <Pressable
                  onPress={() =>
                    setDestinationToSuggestion(destionationSuggestion)
                  }
                  key={destionationSuggestion.description}>
                  <View style={styles.suggestionItem}>
                    <Text>{destionationSuggestion.description}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}

          {origin && JSON.stringify(origin)}
          {origin && JSON.stringify(destination)}
        </ScrollView>
      </View>

      <View style={styles.buttonContainer}>
        <Button disabled={!destination} onPress={onNext}>
          Next
        </Button>
      </View>

      <BgDots2Svg style={styles.bgDots2} />
      <BgCircleSvg style={styles.bgCircle} />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    ...Screens.base,
    ...Screens.topAndBottomContent,
    paddingHorizontal: 0,
    paddingTop: 0,
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
  content: {
    flexGrow: 1,
  },
  topContent: {
    marginLeft: -2,
    marginRight: -2,
    marginTop: -2,

    paddingTop: 75,
    paddingBottom: 25,
    paddingHorizontal: 16,

    shadowColor: '#2e5bff',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.07,
    shadowRadius: 2.22,
    elevation: 3,
  },
  bottomContent: {
    paddingHorizontal: 16,
  },
  historyItem: {
    paddingVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  suggestionItem: {
    paddingVertical: 20,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  bgDots2: {
    position: 'absolute',
    zIndex: -5,
    top: -20,
    left: 160,
  },
  bgCircle: {
    position: 'absolute',
    zIndex: -5,
    top: -140,
    left: 300,
  },
});
export default RequestNowOriginDestination;
