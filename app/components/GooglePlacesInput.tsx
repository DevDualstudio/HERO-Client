import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import GoogleMapsService, {
  autoCompleteResult,
} from '../services/GoogleMapsService';
import { ServiceAddress } from '../types/ServiceAddress';

interface GooglePlacesInputProps extends TextInputProps {
  onSuggestions: (sugestions: autoCompleteResult[]) => void;
  selectedAddress?: ServiceAddress;
}

const GooglePlacesInput: React.FC<GooglePlacesInputProps> = ({
  onSuggestions,
  selectedAddress,
  ...props
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(selectedAddress?.address || '');
  }, [selectedAddress]);

  const getAddresses = async (text: string) => {
    if (text.length < 3) {
      return [];
    }

    const results = await GoogleMapsService.autoCompleteResults(text);
    return results;
  };

  const onChangeText = async (text: string) => {
    setValue(text);
    const autocompleteSuggestions = await getAddresses(text);

    onSuggestions(
      autocompleteSuggestions.map((res) => ({
        description: res.description,
        placeId: res.place_id,
      })),
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        {...props}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#F4F5F8',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
export default GooglePlacesInput;
