import React from 'react';
import { View } from 'react-native';
import { autoCompleteResult } from '../services/GoogleMapsService';
import { ServiceAddress } from '../types/ServiceAddress';
import GooglePlacesInput from './GooglePlacesInput';

interface LocationSelectionInputsProps {
  onOriginSuggestions: (sugestions: autoCompleteResult[]) => void;
  onDestionationSuggestions: (sugestions: autoCompleteResult[]) => void;
  onFocusChange: (focus: 'ORIGIN' | 'DESTINATION' | 'NONE') => void;
  origin?: ServiceAddress;
  destination?: ServiceAddress;
}

const LocationSelectionInputs: React.FC<LocationSelectionInputsProps> = ({
  onOriginSuggestions,
  onDestionationSuggestions,
  onFocusChange,
  origin,
  destination,
}) => {
  return (
    <View>
      <GooglePlacesInput
        placeholder="Current location"
        onSuggestions={onOriginSuggestions}
        onFocus={() => onFocusChange('ORIGIN')}
        // onBlur={() => setTimeout(() => onFocusChange('NONE'), 500)}
        selectedAddress={origin}
      />
      <GooglePlacesInput
        placeholder="Destination"
        onSuggestions={onDestionationSuggestions}
        onFocus={() => onFocusChange('DESTINATION')}
        // onBlur={() => setTimeout(() => onFocusChange('NONE'), 500)}
        selectedAddress={destination}
        autoFocus
      />
    </View>
  );
};
export default LocationSelectionInputs;
