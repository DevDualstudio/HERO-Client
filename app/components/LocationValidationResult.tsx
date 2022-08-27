import React from 'react';

import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import CardBase from '../components/CardBase';
import SvgIconLocationValidated from '../components/svgs/ValidLocationSvg';
import SvgIconInvalidLocation from './svgs/InvalidLocationSvg';
import { fontFamily, fontSize } from '../styles/typography';

interface LocationValidationResultProps {
  style?: ViewStyle;
  isAvailable: Boolean;
}

const LocationValidationResult = ({
  style,
  isAvailable,
}: LocationValidationResultProps): JSX.Element => {
  return (
    <CardBase style={[styles.card, style]}>
      <View style={styles.icon}>
        {isAvailable ? (
          <SvgIconLocationValidated />
        ) : (
          <SvgIconInvalidLocation />
        )}
      </View>
      <Text style={styles.text}>
        {isAvailable ? 'Available in your area' : 'Not available in your area'}
      </Text>
    </CardBase>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 20,
  },
  text: {
    ...fontSize.x18,
    ...fontFamily.Medium,
  },
});
export default LocationValidationResult;
